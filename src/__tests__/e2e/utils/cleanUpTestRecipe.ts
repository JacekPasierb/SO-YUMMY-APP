export async function cleanupTestRecipe(page: any, title: string) {
    await page.evaluate(async (title: string) => {
      try {
        const res = await fetch("/api/ownRecipes");
  
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          console.error(
            "Niepoprawna odpowiedź z /api/ownRecipes",
            res.status,
            contentType
          );
          return;
        }
  
        const data = await res.json();
        const found = data.find((r: any) => r.title === title);
  
        if (found?._id) {
          const deleteRes = await fetch(`/api/recipes/${found._id}`, {
            method: "DELETE",
          });
          console.log("Usunięto testowy przepis:", deleteRes.status);
        } else {
          console.warn("Nie znaleziono przepisu do usunięcia");
        }
      } catch (err) {
        console.error("Błąd czyszczenia testowego przepisu:", err);
      }
    }, title);
  }