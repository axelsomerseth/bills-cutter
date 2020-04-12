package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

type Bill struct {
	ID             int     `json:"id,omitempty"`
	NumberOfPeople float64 `json:"numberOfPeople"`
	BillAmount     float64 `json:"billAmount"`
	Username       string  `json:"username"`
	Notes          string  `json:"notes"`
}

type Payer struct {
	Name  string `json:"name"`
	Money string `json:"money"`
}

func databaseConnection() *sql.DB {
	const (
		host     = "localhost"
		port     = 5432
		user     = "postgres"
		password = "admin"
		dbname   = "bills_cutter"
	)
	connectionString := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
		panic(err)
	}
	return db
}

func createBill(numberOfPeople float64, billAmount float64, username string, notes string) {
	db := databaseConnection()
	sqlStatement := `
		INSERT INTO bills (number_of_people, bill_amount, username, notes)
		VALUES ($1, $2, $3, $4)
		RETURNING id`
	id := 0
	err := db.QueryRow(sqlStatement, numberOfPeople, billAmount, username, notes).Scan(&id)
	if err != nil {
		panic(err)
	}
	fmt.Println("New record ID is:", id)
	defer db.Close()
}

func readBill(uid int) Bill {
	var result Bill
	db := databaseConnection()
	sqlStatement := `SELECT id, number_of_people, bill_amount, username, notes 
		FROM bills 
		WHERE id=$1;`
	var id int
	var numberOfPeople float64
	var billAmount float64
	var username string
	var notes string
	row := db.QueryRow(sqlStatement, uid)
	switch err := row.Scan(&id, &numberOfPeople, &billAmount, &username, &notes); err {
	case sql.ErrNoRows:
		fmt.Println("Record does not exist!")
	case nil:
		result = Bill{ID: id, NumberOfPeople: numberOfPeople, BillAmount: billAmount, Username: username, Notes: notes}
		fmt.Println(id, numberOfPeople, billAmount, username, notes)
	default:
		panic(err)
	}
	defer db.Close()
	return result
}

func listBill(limit int) []Bill {
	var result []Bill
	db := databaseConnection()
	sqlStatement := `SELECT id, number_of_people, bill_amount, username, notes 
		FROM bills
		ORDER BY id DESC
		LIMIT $1;`
	rows, err := db.Query(sqlStatement, limit)
	if err != nil {
		fmt.Println("There are not any records!")
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		var numberOfPeople float64
		var billAmount float64
		var username string
		var notes string
		err = rows.Scan(&id, &numberOfPeople, &billAmount, &username, &notes)
		if err != nil {
			fmt.Println("An error has ocurred when trying to read the records")
			panic(err)
		}
		actualBill := Bill{ID: id, NumberOfPeople: numberOfPeople, BillAmount: billAmount, Username: username, Notes: notes}
		result = append(result, actualBill)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}
	defer db.Close()
	return result
}

// Client request and server response handler
func handler(writer http.ResponseWriter, request *http.Request) {
	// CORS policy: allowing to request from cross-origin domains
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	writer.Header().Set("Access-Control-Allow-Credentials", "include")
	writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")
	if request.URL.Path != "/" && request.URL.Path != "/history" {
		http.Error(writer, "404 not found. Path: "+request.URL.Path, http.StatusNotFound)
		return
	}
	switch request.Method {
	case "GET":
		fmt.Println("GET method")
		writer.Header().Set("Content-Type", "application/json; charset=utf-8")
		writer.WriteHeader(http.StatusOK)
		fmt.Println("Welcome to Bills Cutter API!")
	case "POST":
		fmt.Println("POST method")
		switch request.URL.Path {
		case "/":
			writer.Header().Set("Content-Type", "application/json; charset=utf-8")
			writer.WriteHeader(http.StatusOK)
			var bill Bill
			err := json.NewDecoder(request.Body).Decode(&bill)
			if err != nil {
				http.Error(writer, err.Error(), http.StatusBadRequest)
				return
			}
			if bill.Username != "Unregistered" {
				createBill(bill.NumberOfPeople, bill.BillAmount, bill.Username, bill.Notes)
			}
			money := fmt.Sprintf("%f", bill.BillAmount/bill.NumberOfPeople)
			payer := Payer{Name: bill.Username, Money: money}
			buffer, err2 := json.Marshal(payer)
			if err2 != nil {
				panic(err2)
			}
			writer.Write(buffer)
		case "/history":
			writer.Header().Set("Content-Type", "application/json; charset=utf-8")
			writer.WriteHeader(http.StatusOK)
			var buffer []byte
			response := listBill(15)
			buffer, _ = json.Marshal(response)
			writer.Write(buffer)
		}
	case "OPTIONS":
		fmt.Println("OPTIONS method")
		writer.Header().Set("Content-Type", "application/json; charset=utf-8")
	default:
		fmt.Fprintf(writer, "Sorry, only GET and POST methods are supported.")
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handler)
	http.ListenAndServe(":8080", mux)
}
