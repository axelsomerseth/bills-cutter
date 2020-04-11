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
	NumberOfPeople float64 `json:"numberOfPeople"`
	BillAmount     float64 `json:"billAmount"`
	Username       string  `json:"username"`
}

type Payer struct {
	Name  string `json:"name"`
	Money string `json:"money"`
}

func insert(numberOfPeople float64, billAmount float64, username string) {
	db := databaseConn()
	sqlStatement := `
		INSERT INTO bills (number_of_people, bill_amount, username)
		VALUES ($1, $2, $3)
		RETURNING id`
	id := 0
	err := db.QueryRow(sqlStatement, numberOfPeople, billAmount, username).Scan(&id)
	if err != nil {
		panic(err)
	}
	fmt.Println("New record ID is:", id)
	defer db.Close()
}

func list(limit int) {
	limit = 3 // TODO: remove this
	db := databaseConn()
	sqlStatement := `SELECT id, number_of_people, bill_amount, username 
		FROM bills
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
		err = rows.Scan(&id, &numberOfPeople, &billAmount, &username)
		if err != nil {
			fmt.Println("An error has ocurred when trying to read the records")
			panic(err)
		}
		// TODO: intead of print store in a slice
		fmt.Println(id, numberOfPeople, billAmount, username)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}
	defer db.Close()
}

func read(uid int) {
	db := databaseConn()
	sqlStatement := `SELECT id, number_of_people, bill_amount, username 
		FROM bills 
		WHERE id=$1;`
	var id int
	var numberOfPeople float64
	var billAmount float64
	var username string
	row := db.QueryRow(sqlStatement, uid)
	switch err := row.Scan(&id, &numberOfPeople, &billAmount, &username); err {
	case sql.ErrNoRows:
		fmt.Println("Record does not exist!")
	case nil:
		// TODO: intead of print store in a slice
		fmt.Println(id, numberOfPeople, billAmount, username)
	default:
		panic(err)
	}
	defer db.Close()
}

func databaseConn() *sql.DB {
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

func handler(writer http.ResponseWriter, request *http.Request) {
	// for CORS policy: allowing to request from cross side domains
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	writer.Header().Set("Access-Control-Allow-Credentials", "include")
	writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")
	if request.URL.Path != "/" {
		http.Error(writer, "404 not found. Path: "+request.URL.Path, http.StatusNotFound)
		return
	}
	switch request.Method {
	case "GET":
		fmt.Println("GET method")
		var buffer []byte
		payer := Payer{}
		payer.Name = "Axel"
		payer.Money = "50"
		fmt.Println(payer)
		writer.Header().Set("Content-Type", "application/json; charset=utf-8")
		writer.WriteHeader(http.StatusOK)
		buffer, _ = json.Marshal(payer)
		writer.Write(buffer)
	case "POST":
		fmt.Println("POST method")
		var bill Bill
		err := json.NewDecoder(request.Body).Decode(&bill)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}
		payer := Payer{}
		payer.Name = bill.Username
		result := bill.BillAmount / bill.NumberOfPeople
		payer.Money = fmt.Sprintf("%f", result)
		payerJSON, err := json.Marshal(payer)
		if err != nil {
			panic(err)
		}
		writer.Header().Set("Content-Type", "application/json; charset=utf-8")
		writer.WriteHeader(http.StatusOK)
		writer.Write(payerJSON)
	case "OPTIONS":
		fmt.Println("OPTIONS method")
		writer.Header().Set("Content-Type", "application/json; charset=utf-8")
		fmt.Fprintf(writer, "Sorry, only GET and POST methods are supported.")
	default:
		fmt.Fprintf(writer, "Sorry, only GET and POST methods are supported.")
	}
}

func main() {
	list(3)
	mux := http.NewServeMux()
	mux.HandleFunc("/", handler)
	http.ListenAndServe(":8080", mux)
}
