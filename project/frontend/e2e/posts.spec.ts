import { test, expect, type Page } from "@playwright/test";

const API = process.env.VITE_API_URL!;

async function resetAndSeed(page: Page, count: number = 5) {
  const response = await page.request.post(`${API}/test/reset`, {
    data: { count },
  });
  expect(response.ok()).toBeTruthy();
}

test.describe("Post Feed", () => {
  test.describe.configure({ mode: "serial" });

  test("new post appears as first item after submission", async ({ page }) => {
    await resetAndSeed(page, 5);
    await page.goto("/");
    await expect(page.getByTestId("post-card").first()).toBeVisible();

    const uniqueText = `Playwright test post ${Date.now()}`;

    await page.getByTestId("post-input").fill(uniqueText);
    await page.getByTestId("post-submit").click();

    const firstCard = page.getByTestId("post-card").first();
    await expect(firstCard).toContainText(uniqueText);

    const postId = await firstCard.getAttribute("data-post-id");
    expect(postId).not.toBeNull();
    expect(Number(postId)).toBeGreaterThan(0);
  });

  test("pagination loads more posts on scroll", async ({ page }) => {
    await resetAndSeed(page, 25);
    await page.goto("/");
    await expect(page.getByTestId("post-card").first()).toBeVisible();

    const initialCount = await page.getByTestId("post-card").count();
    expect(initialCount).toBe(10);

    await page.getByTestId("post-card").last().scrollIntoViewIfNeeded();

    await expect.poll(
      async () => page.getByTestId("post-card").count(),
      { timeout: 8000 }
    ).toBeGreaterThan(initialCount);

    const newCount = await page.getByTestId("post-card").count();
    expect(newCount).toBeGreaterThan(initialCount);
  });
});
