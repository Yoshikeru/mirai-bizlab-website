import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MIRAI BizLab — Accounting & Consulting Partner in Bangkok";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FAFAFA",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          color: "#1A1A1A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#D7000F",
            fontSize: 20,
            letterSpacing: "0.32em",
            fontWeight: 700,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#D7000F",
              color: "#FFFFFF",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            M
          </span>
          <span>MIRAI BIZLAB</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>
            Accounting & Consulting
            <br />
            Partner in Bangkok.
          </span>
          <span style={{ fontSize: 24, color: "#6B6B6B", lineHeight: 1.5 }}>
            For every Japanese SME venturing into Thailand.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#6B6B6B",
            fontSize: 18,
          }}
        >
          <span>miraibizlab.co.th</span>
          <span>Bangkok · Thailand</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
