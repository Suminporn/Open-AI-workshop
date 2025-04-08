import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  const data = await request.json()
  const topic = data.topic
  const prompt = `Create set of names for 5 cards from this topic: ${topic}
  Format as: 
  1:name1
  2:name2
  3:name3
  4:name4
  5:name5
  `

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  })
  const aiContent = completion.choices[0].message.content

  const finalNamecardArray = aiContent.split('\n').map((item) => {
    const id = item.split(':')[0]
    const name = item.split(':')[1]
    return {
      id: id,
      name: name
    }
  })

  return Response.json(finalNamecardArray)
}