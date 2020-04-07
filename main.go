package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Bill struct {
	NumberOfPeople float64 `json:"numberOfPeople"`
	BillAmount     float64 `json:"billAmount"`
}

type Payer struct {
	Name  string `json:"name"`
	Money string `json:"money"`
}

func handler2(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")
	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Max-Age", "86400")
		w.WriteHeader(http.StatusOK)
		return
	}
}

func handler(writer http.ResponseWriter, request *http.Request) {
	if request.URL.Path != "/" {
		http.Error(writer, "404 not found. Path: "+request.URL.Path, http.StatusNotFound)
		return
	}
	switch request.Method {
	case "GET":
		var buffer []byte
		payer := Payer{}
		payer.Name = "Axel"
		payer.Money = "50"
		fmt.Println(payer)
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")
		writer.Header().Set("Content-Type", "application/json; charset=utf-8")
		writer.WriteHeader(http.StatusOK)
		buffer, _ = json.Marshal(payer)
		writer.Write(buffer)
	case "POST":
		var bill Bill
		err := json.NewDecoder(request.Body).Decode(&bill)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}
		payer := Payer{}
		payer.Name = "Axel"
		result := bill.BillAmount / bill.NumberOfPeople
		payer.Money = fmt.Sprintf("%f", result)
		payerJSON, err := json.Marshal(payer)
		if err != nil {
			panic(err)
		}
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Credentials", "include")
		// TODO: remove other methods
		writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")
		writer.Header().Set("Content-Type", "application/json; charset=utf-8")
		writer.WriteHeader(http.StatusOK)
		writer.Write(payerJSON)
	case "OPTIONS":
		fmt.Fprintf(writer, "Sorry, only GET and POST methods are supported.")
	default:
		fmt.Fprintf(writer, "Sorry, only GET and POST methods are supported.")
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handler)
	http.ListenAndServe(":8080", mux)
}
