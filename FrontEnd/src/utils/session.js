export function getUser() {
  try {
    const raw = JSON.parse(localStorage.getItem("user") || "null");
    return raw?.user ?? raw;
  } catch {
    return null;
  }
}

export function getUserId() {
  const u = getUser();
  return u?.id_usuario ?? u?.id ?? null;
}
