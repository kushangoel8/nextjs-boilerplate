import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bars = [
  { label: "Loves the rarity hook", value: 73, color: "#34d399" },
  { label: "Worried about shipping", value: 57, color: "#f87171" },
  { label: "Would pay $12+/month", value: 41, color: "#22d3ee" },
];

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
          background: "linear-gradient(160deg, #0a0714 55%, #1b1638 100%)",
          color: "#f2efff",
          fontFamily: "sans-serif",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #7c3aed, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            H
          </div>
          <span style={{ fontSize: 34, fontWeight: 700 }}>Hundred</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          Test it on 100 people who don&apos;t exist.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#9d97c9",
            marginTop: 18,
          }}
        >
          Synthetic audience panels for founders — objections, sentiment, price curve.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginTop: 44,
            width: 720,
          }}
        >
          {bars.map((bar) => (
            <div
              key={bar.label}
              style={{ display: "flex", alignItems: "center", gap: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  width: 250,
                  fontSize: 17,
                  color: "#9d97c9",
                  justifyContent: "flex-end",
                }}
              >
                {bar.label}
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  height: 14,
                  borderRadius: 7,
                  background: "#201a42",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: `${bar.value}%`,
                    height: 14,
                    borderRadius: 7,
                    background: bar.color,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: 40,
                  fontSize: 18,
                  fontWeight: 700,
                  color: bar.color,
                }}
              >
                {bar.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
