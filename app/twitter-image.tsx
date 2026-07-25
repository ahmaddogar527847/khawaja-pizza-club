import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Khawaja Pizza Club - Premium Pizza & Burgers";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            Khawaja Pizza Club
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "#d4d4d4",
              marginBottom: "15px",
            }}
          >
            Premium Pizza, Burgers & Fast Food
          </p>
          <p
            style={{
              fontSize: "28px",
              color: "#a3a3a3",
              marginTop: "15px",
            }}
          >
            Free Delivery in Shujaabad
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
