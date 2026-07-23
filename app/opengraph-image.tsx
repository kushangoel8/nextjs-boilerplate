import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#eef2ff",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#4f46e5",
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#1e1b4b" }}>
            Sidetrack
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: 56,
            fontWeight: 700,
            color: "#1e1b4b",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          <span style={{ marginRight: 14 }}>The check-in that</span>
          <span style={{ color: "#4f46e5" }}>actually gets through.</span>
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#4c4a75",
            marginTop: 28,
            textAlign: "center",
            maxWidth: 780,
          }}
        >
          Short texts and voice notes about the specific things you&apos;re
          juggling — not another reminder you swipe away.
        </div>
      </div>
    ),
    { ...size },
  );
}
