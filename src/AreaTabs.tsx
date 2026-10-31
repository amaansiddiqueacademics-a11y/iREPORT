import { useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type Session } from "./api";
import { Icon } from "./Icon";
import WardCard from "./WardCard";
import { demoLogin } from "./demoLogins";
import { tr, trf, type Lang } from "./i18n";

/** One tab per area authority ("Dadar Authority"). Your own area is the active tab. Opening another area means signing in as
    that area's authority: officers never see or change another area's complaints without their own login (the server enforces
    this too). The officer's own ward office card is always shown, with or without tabs. */
export default function AreaTabs({ ownArea, lang, onSwitch }: { ownArea: string | null; lang: Lang; onSwitch: (s: Session) => void }) {
  const qc = useQueryClient();
  const areas = useQuery({ queryKey: ["authority", "areas"], queryFn: api.authorityAreas, staleTime: 5 * 60_000 });
  const [target, setTarget] = useState<string | null>(null);
  const [email, setEmail] = useState(""), [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  // Your own area first, so its tab is visible without scrolling through all the areas.
  const items = [...(areas.data?.items ?? [])].sort((x, y) => Number(y.is_mine) - Number(x.is_mine));
  const ownCard = ownArea ? <WardCard area={ownArea} /> : null;
  if (items.length < 2) return ownCard;

  const pick = (area: string, mine: boolean) => {
    if (mine) { setTarget(null); return; }
    const demo = demoLogin(area); // development only: the ward's seeded login is filled in; in production the fields start empty
    setTarget(area); setEmail(demo?.email ?? ""); setPassword(demo?.password ?? ""); setError("");
  };
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const session = await api.login(email.trim(), password, "authority");
      qc.clear(); // nothing from the previous area stays on screen
      onSwitch(session);
    } catch (err) {
      setError((err as Error).message || tr(lang, "at_failed"));
    } finally {
      setBusy(false);
    }
  };

  return <section className="area-tabs-wrap" aria-label={tr(lang, "at_label")}>
    <div className="area-tabs" role="tablist" aria-label={tr(lang, "at_label")}>
      {items.map(a => <button key={a.area} role="tab" aria-selected={a.is_mine} className={`${a.is_mine ? "active" : ""}${target === a.area ? " target" : ""}`} onClick={() => pick(a.area, a.is_mine)}>
        {a.is_mine && <Icon name="shield" size={14} />} {trf(lang, "at_tab", { area: a.area })}</button>)}
    </div>
    {!target && ownCard}
    {target && <form className="area-login" onSubmit={e => void submit(e)}>
      <WardCard area={target} />
      <p><b>{trf(lang, "at_tab", { area: target })}</b>: {trf(lang, "at_signInFor", { area: target })}</p>
      <label className="fld"><span>{tr(lang, "at_email")}</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" required /></label>
      <label className="fld"><span>{tr(lang, "at_password")}</span><input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required /></label>
      {error && <div className="form-error" role="alert"><Icon name="alert" size={16} /> {error}</div>}
      <div className="act-row"><button className="primary compact" disabled={busy || !password}>{busy ? tr(lang, "at_signingIn") : tr(lang, "at_signIn")}</button><button type="button" className="secondary compact" onClick={() => setTarget(null)}>{tr(lang, "at_cancel")}</button></div>
    </form>}
  </section>;
}
