'use client'
import { useState } from "react";

export default function Home() {

  const [namecards, setNamecards] = useState([])
  const [topic, setTopic] = useState('ชื่อ')
  const [loading, setLoading] = useState(false)


  const generateNamecards = async (event) => {
    event.preventDefault()
    setLoading(true)
    const response = await fetch('/api/word-gen', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topic,
      })
    })

    const namecardsData = await response.json()
    setNamecards(namecardsData)
    setLoading(false)
  }

  return (
    <form onSubmit={generateNamecards} className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Create Card</h1>
      <input type="text" placeholder="กรอกหัวข้อในการตั้งชื่อ"
        name="topic"
        onChange={(event) => setTopic(event.target.value)}
        value={topic}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading..' : 'สร้าง Card'}
      </button>
      คุณเลือกหัวข้อ {topic}
      {namecards ?
        <div className="flex flex-wrap">
          {namecards.map((namecard) => (
            <div key={namecard.id} className="w-1/2 p-2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">{namecard.word}</h2>
              </div>
            </div>
          ))}
        </div> : ''}
    </form>
  );
}