// GASバックエンドとの通信ヘルパー（全ページ共通）
const Api = {
  async list(sheet) {
    return Api._call(sheet, "list");
  },
  async add(sheet, data) {
    return Api._call(sheet, "add", { data: JSON.stringify(data) });
  },
  async update(sheet, id, data) {
    return Api._call(sheet, "update", { id, data: JSON.stringify(data) });
  },
  async remove(sheet, id) {
    return Api._call(sheet, "delete", { id });
  },
  async _call(sheet, action, extra) {
    const params = new URLSearchParams({
      sheet,
      action,
      key: CONFIG.API_KEY,
      ...extra,
    });
    const res = await fetch(`${CONFIG.GAS_URL}?${params.toString()}`);
    if (!res.ok) throw new Error("通信に失敗しました (" + res.status + ")");
    const json = await res.json();
    if (!json.success) throw new Error(json.error || "サーバーエラー");
    return json.data;
  },
};
