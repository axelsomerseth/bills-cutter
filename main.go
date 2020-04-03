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

func handler(writer http.ResponseWriter, request *http.Request) {
	if request.URL.Path != "/" {
		http.Error(writer, "404 not found. Path: "+request.URL.Path, http.StatusNotFound)
		return
	}
	switch request.Method {
	case "GET":
		payer := Payer{}
		payer.Name = "Axel"
		payer.Money = "50"
		fmt.Println(payer)
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Credentials", "true")
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusCreated)
		json.NewEncoder(writer).Encode(payer)
	case "POST":
		payer := Payer{}
		payer.Name = "Axel"
		payerJSON, err := json.Marshal(payer)
		if err != nil {
			panic(err)
		}
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Credentials", "true")
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusOK)
		writer.Write(payerJSON)

		// other way
		// writer.Header().Set("Content-Type", "application/json")
		// jsonStr := `{"Name":"Axel","Money":50}`
		// writer.Write([]byte(jsonStr))
	case "OPTIONS":
		payer := Payer{}
		payer.Name = "Axel"
		payerJSON, err := json.Marshal(payer)
		if err != nil {
			panic(err)
		}
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Credentials", "true")
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusOK)
		writer.Write(payerJSON)
	default:
		fmt.Fprintf(writer, "Sorry, only GET and POST methods are supported.")
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handler)
	http.ListenAndServe(":8080", mux)
}
