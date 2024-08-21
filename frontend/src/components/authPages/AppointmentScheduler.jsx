import React, { useState } from "react"

const AppointmentScheduler = () =>{

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [slots, setSlots] = useState([])

    const handleAddSlot = () => {
        if(startTime && endTime && startTime < endTime){
            const newSlot = {
                start: startTime,
                end: endTime
            }
            setSlots([...slots, newSlot])
            setStartTime('')
            setEndTime('')
        }
        else{
            alert('Invalid time range or end time is earlier than start time.')
        }
    }

    return(
        <div className="slot-scheduler-container">
            <h2>Set Availability Slots</h2>

            <div className="time-picker-container">
                <div className="time-picker">
                    <label>Start Time:</label>
                    <input 
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>

                <div className="time-picker">
                    <label>End Time:</label>
                    <input 
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
            </div>

        <button className="add-slot-button" onClick={handleAddSlot}>Add Slot</button>

        <div className="slots-list">
            <h3>Current Slots:</h3>
            {slots.map((slot, index) => (
                <div key={index} className="slot-item">
                    {`${slot.start} - ${slot.end}`}
                </div>
            ))}
        </div>

        </div>
    )
}

export default AppointmentScheduler