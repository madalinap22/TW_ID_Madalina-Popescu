import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const BACKEND_URL = 'http://localhost:8000';
  const [parcari, setParcari] = useState([]);
  const [locuriParcare, setLocuriParcare] = useState([]);

  const [editParcare, setEditParcare] = useState(null);
  const [newParcare, setNewParcare] = useState({
    name: "",
    adresa: "",
    capacitate: "",
    latitudine: "",
    longitudine: "",
  });

  const [editLocParcare, setEditLocParcare] = useState(null);
  const [newParkingSpot, setNewParkingSpot] = useState({
    numarLoc: "",
    status: "LIBER",
    parkingLotId: "",
  });

  const fetchParcari = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/parcari`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setParcari(data);
    } catch (error) {
      console.error('Error fetching parcari:', error);
    }
  };

  const deleteParcare = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/parcari/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert(`Parcarea cu ID-ul ${id} a fost stearsa.`);
        fetchParcari();
      } else {
        alert("Eroare la stergerea parcarii.");
      }
    } catch (error) {
      console.error("Error deleting parcare:", error);
    }
  };

  const updateParcare = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/parcari/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editParcare),
      });
      if (response.ok) {
        alert(`Parcarea cu ID-ul ${id} a fost actualizata.`);
        setEditParcare(null); 
        fetchParcari();
      } else {
        alert("Eroare la actualizarea parcarii.");
      }
    } catch (error) {
      console.error("Error updating parcare:", error);
    }
  };
  const addParcare = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/parcari`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParcare),
      });
      if (response.ok) {
        alert("Parcarea a fost adaugata cu succes!");
        setNewParcare({
          name: "",
          adresa: "",
          capacitate: "",
          latitudine: "",
          longitudine: "",
        }); //reset formular
        fetchParcari(); 
      } else {
        alert("Eroare la adaugarea parcarii.");
      }
    } catch (error) {
      console.error("Error adding parcare:", error);
    }
  };

  const fetchLocuriParcare = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/locuri`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLocuriParcare(data);
    } catch (error) {
      console.error("Error fetching locurile de parcare:", error);
    }
  };
  const addParkingSpot = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/locuri`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParkingSpot),
      });
      if (response.ok) {
        alert("Locul de parcare a fost adaugat cu succes!");
        setNewParkingSpot({ numarLoc: "", status: "LIBER", parkingLotId: "" });
        fetchLocuriParcare();
      } else {
        alert("Eroare la adaugarea locului de parcare. Capacitatea parcarii a fost depasita");
      }
    } catch (error) {
      console.error("Error adding parking spot:", error);
    }
  };

  const updateParkingSpot = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/locuri/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editLocParcare),
      });
      if (response.ok) {
        alert(`Locul de parcare cu ID-ul ${id} a fost actualizat.`);
        setEditLocParcare(null);
        fetchLocuriParcare();
      } else {
        alert("Eroare la actualizarea locului de parcare.");
      }
    } catch (error) {
      console.error("Error updating parking spot:", error);
    }
  };

  const deleteParkingSpot = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/locuri/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert(`Locul de parcare cu ID-ul ${id} a fost sters.`);
        fetchLocuriParcare();
      } else {
        alert("Eroare la stergerea locului de parcare.");
      }
    } catch (error) {
      console.error("Error deleting parking spot:", error);
    }
  };


  return (
    <div className="App">
      <h1>Administrare locuri de parcare</h1>
  
      {}
      <h2>Parcari Disponibile</h2>
      <button onClick={fetchParcari}>Afiseaza parcarile</button>
      <ul>
        {parcari.map((parcare) => (
          <li key={parcare.id}>
            <strong>{parcare.name}</strong> - {parcare.adresa} (Capacitate: {parcare.capacitate}, Latitudine: {parcare.latitudine}, Longitudine: {parcare.longitudine})
            <br />
            <button onClick={() => deleteParcare(parcare.id)}>Sterge</button>
            <button
              onClick={() =>
                setEditParcare({
                  id: parcare.id,
                  name: parcare.name,
                  adresa: parcare.adresa,
                  capacitate: parcare.capacitate,
                  latitudine: parcare.latitudine,
                  longitudine: parcare.longitudine,
                })
              }
            >
              Editeaza
            </button>
            {editParcare?.id === parcare.id && (
              <div>
                <input
                  type="text"
                  value={editParcare.name}
                  onChange={(e) =>
                    setEditParcare({ ...editParcare, name: e.target.value })
                  }
                  placeholder="Nume"
                />
                <input
                  type="text"
                  value={editParcare.adresa}
                  onChange={(e) =>
                    setEditParcare({ ...editParcare, adresa: e.target.value })
                  }
                  placeholder="Adresa"
                />
                <input
                  type="number"
                  value={editParcare.capacitate}
                  onChange={(e) =>
                    setEditParcare({
                      ...editParcare,
                      capacitate: parseInt(e.target.value),
                    })
                  }
                  placeholder="Capacitate"
                />
                <input
                  type="number"
                  step="0.000001"
                  value={editParcare.latitudine}
                  onChange={(e) =>
                    setEditParcare({
                      ...editParcare,
                      latitudine: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Latitudine"
                />
                <input
                  type="number"
                  step="0.000001"
                  value={editParcare.longitudine}
                  onChange={(e) =>
                    setEditParcare({
                      ...editParcare,
                      longitudine: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Longitudine"
                />
                <button onClick={() => updateParcare(parcare.id)}>
                  Salveaza
                </button>
                <button onClick={() => setEditParcare(null)}>Anuleaza</button>
              </div>
            )}
          </li>
        ))}
      </ul>
  
      <h2>Adauga o noua parcare</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addParcare();
        }}
      >
        <input
          type="text"
          value={newParcare.name}
          onChange={(e) => setNewParcare({ ...newParcare, name: e.target.value })}
          placeholder="Nume"
          required
        />
        <input
          type="text"
          value={newParcare.adresa}
          onChange={(e) =>
            setNewParcare({ ...newParcare, adresa: e.target.value })
          }
          placeholder="Adresa"
          required
        />
        <input
          type="number"
          value={newParcare.capacitate}
          onChange={(e) =>
            setNewParcare({
              ...newParcare,
              capacitate: parseInt(e.target.value),
            })
          }
          placeholder="Capacitate"
          required
        />
        <input
          type="number"
          step="0.000001"
          value={newParcare.latitudine}
          onChange={(e) =>
            setNewParcare({
              ...newParcare,
              latitudine: parseFloat(e.target.value),
            })
          }
          placeholder="Latitudine"
          required
        />
        <input
          type="number"
          step="0.000001"
          value={newParcare.longitudine}
          onChange={(e) =>
            setNewParcare({
              ...newParcare,
              longitudine: parseFloat(e.target.value),
            })
          }
          placeholder="Longitudine"
          required
        />
        <button type="submit">Adauga Parcare</button>
      </form>
  
      {/* locuri de parcare*/}
      <h2>Selecteaza o parcare</h2>
      <select
        onChange={(e) => setNewParkingSpot({ ...newParkingSpot, parkingLotId: e.target.value })}
        value={newParkingSpot.parkingLotId || ""}
      >
        <option value="" disabled>
          Selecteaza o parcare
        </option>
        {parcari.map((parcare) => (
          <option key={parcare.id} value={parcare.id}>
            {parcare.name}
          </option>
        ))}
      </select>
  
      <h2>Locuri de Parcare</h2>
      <button
        onClick={() => {
          if (!newParkingSpot.parkingLotId) {
            alert("Te rugam sa selectezi o parcare din lista!");
            return;
          }
          fetchLocuriParcare(); 
        }}
      >
        Afiseaza Locurile de Parcare
      </button>
      <ul>
        {locuriParcare
          .filter((loc) => loc.parkingLotId === parseInt(newParkingSpot.parkingLotId)) 
          .map((loc) => (
            <li key={loc.id}>
              Loc #{loc.numarLoc} - Status: {loc.status} - Parcare: {loc.parkingLotName || "N/A"}
              <br />
              <button onClick={() => deleteParkingSpot(loc.id)}>Sterge</button>
              <button
                onClick={() =>
                  setEditLocParcare({
                    id: loc.id,
                    numarLoc: loc.numarLoc,
                    status: loc.status,
                    parkingLotId: loc.parkingLotId,
                  })
                }
              >
                Editeaza
              </button>
              {editLocParcare?.id === loc.id && (
                <div>
                  <input
                    type="text"
                    value={editLocParcare.numarLoc}
                    onChange={(e) =>
                      setEditLocParcare({
                        ...editLocParcare,
                        numarLoc: e.target.value,
                      })
                    }
                    placeholder="Numar loc"
                  />
                  <select
                    value={editLocParcare.status}
                    onChange={(e) =>
                      setEditLocParcare({
                        ...editLocParcare,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="LIBER">LIBER</option>
                    <option value="OCUPAT">OCUPAT</option>
                  </select>
                  <button onClick={() => updateParkingSpot(loc.id)}>Salveaza</button>
                  <button onClick={() => setEditLocParcare(null)}>Anuleaza</button>
                </div>
              )}
            </li>
          ))}
      </ul>
  
      <h2>Adauga un Loc de Parcare</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newParkingSpot.parkingLotId) {
            alert("Te rugam sa selectezi o parcare inainte de a adauga un loc!");
            return;
          }
          addParkingSpot();
        }}
      >
        <input
          type="text"
          value={newParkingSpot.numarLoc}
          onChange={(e) =>
            setNewParkingSpot({ ...newParkingSpot, numarLoc: e.target.value })
          }
          placeholder="Numar Loc"
          required
        />
        <select
          value={newParkingSpot.status}
          onChange={(e) =>
            setNewParkingSpot({ ...newParkingSpot, status: e.target.value })
          }
        >
          <option value="LIBER">LIBER</option>
          <option value="OCUPAT">OCUPAT</option>
        </select>
        <button type="submit">Adauga Loc</button>
      </form>
    </div>
  );
  
  
}

export default App
