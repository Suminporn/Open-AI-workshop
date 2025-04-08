import OpenAI from 'openai'

const openai = new OpenAI({
  'apiKey': process.env.OPENAI_API_KEY
})

export async function POST(request) {
  const data = await request.json()
  const topic = data.topic
  const prompt = `Create 3 sentences of bedtime story from this topic: ${topic}
  Format as: 
  1:sentence1
  2:sentence2
  3:sentence3
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
    const word = item.split(':')[1]
    return {
      id: id,
      word: word
    }
  })

  return Response.json(finalNamecardArray)
}