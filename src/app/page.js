'use client'
import { useState } from "react";

export default function Home() {

  const [storycards, setStorycards] = useState([])
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)


  const generateStorycards = async (event) => {
    event.preventDefault()
    setLoading(true)
    const response = await fetch('/api/word-gen', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topic,
      })
    })

    const storycardsData = await response.json()
    setStorycards(storycardsData)
    setLoading(false)
  }

  return (
    <form onSubmit={generateStorycards} className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Create Story</h1>
      <input type="text" placeholder="กรอกหัวข้อในการแต่งนิทาน"
        name="topic"
        onChange={(event) => setTopic(event.target.value)}
        value={topic}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading..' : 'สร้าง Card'}
      </button>
      คุณเลือกหัวข้อ {topic}
      {storycards ?
        <div className="flex flex-wrap">
          {storycards.map((storycard) => (
            <div key={storycard.id} className="w-1/2 p-2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">{storycard.word}</h2>
              </div>
            </div>
          ))}
        </div> : ''}
    </form>
  );
}