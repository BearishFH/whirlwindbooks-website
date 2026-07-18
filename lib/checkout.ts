// Client helper: kicks off Stripe Checkout for a plan and redirects the browser.
export async function startCheckout(plan: "monthly" | "annual") {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert(data.error ?? "Checkout is not available yet.")
    }
  } catch {
    alert("Something went wrong starting checkout. Please try again.")
  }
}
