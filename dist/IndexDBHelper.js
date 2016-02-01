"use strict";

var indexedDB;

function createDatabase(dbName) {
   var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

   var openRequest = indexedDB.open(dbName);

   openRequest.onerror = function (e) {
      console.log("Database error: " + e.target.errorCode);
   };
   openRequest.onsuccess = function (event) {
      console.log("Database created");
      indexedDB.db = openRequest.result;
   };
   openRequest.onupgradeneeded = function (evt) {
      console.log(111);
   };
}

function deleteDatabase(dbName) {
   var deleteDbRequest = indexedDB.deleteDatabase(dbName);
   deleteDbRequest.onsuccess = function (event) {
      console.log("Database delete");
      // database deleted successfully
   };
   deleteDbRequest.onerror = function (e) {
      console.log("Database error: " + e.target.errorCode);
   };
}

function createObjectStore(dbName) {
   var openRequest = indexedDB.open(dbName, 2);
   openRequest.onerror = function (e) {
      console.log("Database error: " + e.target.errorCode);
   };
   openRequest.onsuccess = function (event) {
      indexedDB.db = openRequest.result;
   };
   openRequest.onupgradeneeded = function (evt) {
      var employeeStore = evt.currentTarget.result.createObjectStore("employees", {
         keyPath: "id"
      });
   };
}

function createIndex() {
   var openRequest = localDatabase.indexedDB.open(dbName, 2);
   openRequest.onerror = function (e) {
      console.log("Database error: " + e.target.errorCode);
   };
   openRequest.onsuccess = function (event) {
      db = openRequest.result;
   };
   openRequest.onupgradeneeded = function (evt) {
      var employeeStore = evt.currentTarget.result.objectStore("employees");
      employeeStore.createIndex("stateIndex", "state", {
         unique: false
      });
      employeeStore.createIndex("emailIndex", "email", {
         unique: true
      });
      employeeStore.createIndex("zipCodeIndex", "zip_code", {
         unique: false
      });
   };
}

function fetchEmployee() {
   try {
      var result = document.getElementById("result");
      result.innerHTML = "";
      if (localDatabase != null && localDatabase.db != null) {
         var store = localDatabase.db.transaction("employees").objectStore("employees");
         store.get("E3").onsuccess = function (event) {
            var employee = event.target.result;
            if (employee == null) {
               result.value = "employee not found";
            } else {
               var jsonStr = JSON.stringify(employee);
               result.innerHTML = jsonStr;
            }
         };
      }
   } catch (e) {
      console.log(e);
   }
}

function fetchEmployeeByEmail() {
   try {
      var result = document.getElementById("result");
      result.innerHTML = "";

      if (localDatabase != null && localDatabase.db != null) {
         var range = IDBKeyRange.only("john.adams@somedomain.com");

         var store = localDatabase.db.transaction("employees").objectStore("employees");

         var index = store.index("emailIndex");

         index.get(range).onsuccess = function (evt) {
            var employee = evt.target.result;
            var jsonStr = JSON.stringify(employee);
            result.innerHTML = jsonStr;
         };
      }
   } catch (e) {}
}

function addEmployee() {
   try {
      var result = document.getElementById("result");
      result.innerHTML = "";

      var transaction = localDatabase.db.transaction("employees", "readwrite");
      var store = transaction.objectStore("employees");

      if (localDatabase != null && localDatabase.db != null) {
         var request = store.add({
            "id": "E5",
            "first_name": "Jane",
            "last_name": "Doh",
            "email": "jane.doh@somedomain.com",
            "street": "123 Pennsylvania Avenue",
            "city": "Washington D.C.",
            "state": "DC",
            "zip_code": "20500"
         });
         request.onsuccess = function (e) {
            result.innerHTML = "Employee record was added successfully.";
         };

         request.onerror = function (e) {
            console.log(e.value);
            result.innerHTML = "Employee record was not added.";
         };
      }
   } catch (e) {
      console.log(e);
   }
}

function updateEmployee() {
   try {
      var result = document.getElementById("result");
      result.innerHTML = "";

      var transaction = localDatabase.db.transaction("employees", "readwrite");
      var store = transaction.objectStore("employees");
      var jsonStr;
      var employee;

      if (localDatabase != null && localDatabase.db != null) {

         store.get("E3").onsuccess = function (event) {
            employee = event.target.result;
            // save old value
            jsonStr = "OLD: " + JSON.stringify(employee);
            result.innerHTML = jsonStr;

            // update record
            employee.email = "john.adams@anotherdomain.com";

            var request = store.put(employee);

            request.onsuccess = function (e) {
               console.log("Added Employee");
            };

            request.onerror = function (e) {
               console.log(e.value);
            };

            // fetch record again
            store.get("E3").onsuccess = function (event) {
               employee = event.target.result;
               jsonStr = "NEW: " + JSON.stringify(employee);
               result.innerHTML = result.innerHTML + jsonStr;
            }; // fetch employee again
         }; // fetch employee first time
      }
   } catch (e) {
      console.log(e);
   }
}

function clearAllEmployees() {
   try {
      var result = document.getElementById("result");
      result.innerHTML = "";

      if (localDatabase != null && localDatabase.db != null) {
         var store = localDatabase.db.transaction("employees", "readwrite").objectStore("employees");

         store.clear().onsuccess = function (event) {
            result.innerHTML = "'Employees' object store cleared";
         };
      }
   } catch (e) {
      console.log(e);
   }
}

createDatabase('test');
setTimeout(function () {
   deleteDatabase('test');
}, 1000);