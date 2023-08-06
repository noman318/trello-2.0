// import openai from "@/openai";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { todos } = await request.json();
//   console.log("todos route ", todos);
//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     temperature: 0.8,
//     n: 1,
//     stream: false,
//     messages: [
//       {
//         role: "system",
//         content:
//           "When responding, welcome the user as always as Shaikh Noman and welcome to the Trello 2.0 with Open AI.",
//       },
//       {
//         role: "user",
//         content: `Hi there, provide a summary of the following tasks. Count how many tasks are in each category such as To-Do, In Progress and Done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
//           todos
//         )}`,
//       },
//     ],
//   });
//   const { data } = response;
//   console.log("data", data);
//   const suggestion = data.choices[0]?.message?.content || "";

//   console.log("Response from GPT", suggestion);
//   return NextResponse.json(suggestion);
// }
import openai, { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiApi = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const { todos } = requestData;

    const response = await openaiApi.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: "system",
          content: `When responding, Welcome the user always as Mr. Bellion and say welcome to the Jello App! Limit the response to 200 characters`,
        },
        {
          role: "user",
          content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress, and done, then tell the user a short inspirational quote to inspire them to have a positive productive day! Here's the data: 
            ${JSON.stringify(todos)}`,
        },
      ],
    });

    const { data } = response;
    const suggestion = data.choices[0]?.message?.content || "";

    return new Response(JSON.stringify({ suggestion }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching suggestion:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch suggestion" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
