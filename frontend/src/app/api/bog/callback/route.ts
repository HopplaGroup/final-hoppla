import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // {
  //     "event": "order_payment",
  //     "zoned_request_time": "2022-11-23T18:06:37.240559Z",
  //     "body": {
  //         "order_id": "a767a276-cddd-43ec-9db3-9f9b39eee02d",
  //         "industry": "ecommerce",
  //         ...
  //     }
  // }
  // this is response
  //   console.log(req.body);

  const body = await req.json(); // Await the parsing of the body

  console.log(body);
  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
