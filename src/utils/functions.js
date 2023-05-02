// With Stability.ai
export async function generateImageFromText(
  prompt,
  { width, height, engine_id }
) {
  const response = await fetch(
    `https://api.stability.ai/v1/generation/${engine_id}/text-to-image`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_STABILITY_API_KEY}`,
      },
      body: JSON.stringify({
        cfg_scale: 7,
        clip_guidance_preset: "FAST_BLUE",
        height,
        width,
        samples: 1,
        steps: 30,
        text_prompts: [
          {
            text: String(prompt),
          },
        ],
      }),
    }
  );

  const data = await response.json();
  const base64 = data.artifacts[0].base64;
  const image = `data:image/jpeg;base64,${String(base64)}`;

  return image;
}
