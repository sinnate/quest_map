// Mapman Mapman Mapman manmanman

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup,Tooltip,useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import { db } from "./firebase";
import {collection, getDocs,doc,GeoPoint, Timestamp,setDoc} from 'firebase/firestore';



function Map() {

  // Handling the firebase database here
  const QuestCollectionRef = collection(db,"quests");
  const [QuestList,SetQuestList] = useState([
    // Just in case of downtime or lost connection
    {
      id : -1,
      location: [51.48, -0.08],
      info :"Found the Ligma of the wood",
      time:"01/02/1989"
    }
  ]);
  const GetQuest = async () =>{
    try{
      const data = await getDocs(QuestCollectionRef);
      const QuestData = data.docs.map((doc) =>({id: doc.id,...doc.data()}))
      // console.log(QuestData);
      const formattedQuests = QuestData.map((doc) => {
        const { id, Location, Timestamp, Info } = doc;
      
        // Extract and format the data
        const location = Location
          ? [Location._lat, Location._long]
          : null;
        const time = Timestamp ? Timestamp.toDate().toLocaleDateString() : null;
      
        return {
          id,
          location,
          time,
          info: Info,
        };
      });
      // console.log("Formated data ahead");
      console.log(formattedQuests);
      
      SetQuestList(formattedQuests);
      
    }
    catch(err){
      console.error(err);
    }
  }
  useEffect(()=> {
      GetQuest();
    },[])
  
  const questInfoArray = [
    "Defeat the mighty dragon in the dark cave.",
    "Rescue the lost villagers from the haunted forest.",
    "Retrieve the enchanted sword from the depths of the ocean.",
    "Solve the riddle of the ancient ruins to unlock hidden treasures.",
    "Escort the caravan through the treacherous mountain pass.",
    "Gather herbs to brew a potion that cures a deadly curse.",
    "Protect the kingdom from invading orcs and goblins.",
    "Deliver an important message to the distant wizard's tower.",
    "Search for the legendary treasure buried in the desert sands.",
    "Track and capture the cunning thief who stole the royal jewels.",
    "Clear the haunted mansion of restless spirits and discover its secrets.",
    "Embark on a pilgrimage to the sacred temple atop the highest peak.",
    "Hunt down a ferocious beast terrorizing the nearby village.",
    "Uncover the truth behind a series of mysterious disappearances.",
    "Help a stranded traveler find their way back to civilization.",
    "Retrieve a rare flower from the mystical forest for a healing potion.",
    "Investigate a shipwreck to find a valuable artifact lost at sea.",
    "Challenge the master swordsman to a duel for honor and glory.",
    "Navigate a treacherous maze to reach a hidden sanctuary.",
    "Rescue a captured fairy to gain her magical assistance."
  ];


  function AddingQuest(){
    
    const addQuest = async (NewQuest) =>{
      const customDocumentName = `Quest ${QuestList.length + 1}`;
      // await addDoc(QuestCollectionRef,NewQuest,customDocumentName)
      await setDoc(doc(db,"quests",customDocumentName),NewQuest)
      GetQuest()
    }
    const map  = useMapEvents({
      click: (e) => {
       
        console.log(e.latlng);
        const newquest = {
           Location: new GeoPoint(e.latlng.lat,e.latlng.lng),
           Info:questInfoArray[(Math.floor(Math.random() * 20))],
           Timestamp: Timestamp.now()
          }
          console.log(newquest);
        addQuest(newquest);

        // SetQuestList(current => [...current, ])
        
        
      }
    })
    return null;
    }
  
  const icons = new Icon({
    iconUrl: require("../img/questmarker.png"),
    iconSize: [16,64]
});
  return (
    <MapContainer 
    center={[51.505, -0.09]}
    zoom={13} 
    style={{ height: "1000px", width: "100%" }}
  
  
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {/*  Markers and Popups here */
      QuestList.map((marker,index) =>(
          <Marker position={marker.location}
          icon={icons}>
            
            <Tooltip direction="right" offset={[5, 0]} opacity={1} permanent>
              {index+1}
            </Tooltip>
            <Popup>
              <h2>Quest</h2>
              <p>
              {marker.info}
              </p>
              <span>{marker.time}</span>
              
            </Popup>

          </Marker>
          
         )
        )
      }
      <AddingQuest/>
    </MapContainer>
   
  );
}

export default Map;
