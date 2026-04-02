import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0F1419", surface: "#1A2028", surfaceAlt: "#232C36",
  border: "#2E3A46", borderLight: "#3D4D5C",
  text: "#E8ECF0", textMuted: "#8A98A8", textDim: "#5C6B7A",
  accent: "#4ECDC4", accentDim: "rgba(78,205,196,0.15)",
  sensory: "#FF6B6B", sensoryDim: "rgba(255,107,107,0.15)",
  motor: "#4ECDC4", motorDim: "rgba(78,205,196,0.15)",
  mixed: "#FFD93D", mixedDim: "rgba(255,217,61,0.15)",
  plxC: "#7C83FF", plxB: "#4ECDC4", plxL: "#FF6B6B", plxS: "#FFD93D",
  correct: "#4ECDC4", incorrect: "#FF6B6B", white: "#FFFFFF",
};
const F = {
  h: "'Playfair Display', Georgia, serif",
  b: "'Source Sans 3', 'Segoe UI', sans-serif",
  m: "'JetBrains Mono', 'Fira Code', monospace",
};

const Badge = ({ type }) => {
  const c = type === "sensory" ? C.sensory : type === "motor" ? C.motor : C.mixed;
  const bg = type === "sensory" ? C.sensoryDim : type === "motor" ? C.motorDim : C.mixedDim;
  return <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: c, background: bg, padding: "2px 8px", borderRadius: 4, fontFamily: F.m }}>{type}</span>;
};
const Pearl = ({ text }) => (
  <div style={{ background: "rgba(255,217,61,0.08)", border: "1px solid rgba(255,217,61,0.25)", borderRadius: 8, padding: 16, marginTop: 16 }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: C.mixed, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: F.m }}>⚡ Clinical Pearl</div>
    <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6, fontFamily: F.b }}>{text}</div>
  </div>
);
const KeyConcept = ({ title, children }) => (
  <div style={{ marginTop: 12, padding: 16, background: C.surface, borderRadius: 8, border: `1px solid ${C.border}` }}>
    <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, fontFamily: F.m, marginBottom: 8 }}>{title || "KEY CONCEPT"}</div>
    <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, fontFamily: F.b }}>{children}</div>
  </div>
);
const InfoCard = ({ color, label, children }) => (
  <div style={{ padding: 16, background: C.surface, borderRadius: 8, border: `1px solid ${color}30` }}>
    <div style={{ fontSize: 11, color, fontFamily: F.m, fontWeight: 700, marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 13, color: C.text, fontFamily: F.b, lineHeight: 1.5 }}>{children}</div>
  </div>
);
const SN = ({ children }) => (
  <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 16, fontFamily: F.b, lineHeight: 1.6 }}>{children}</p>
);
const TB = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    padding: "8px 16px", background: active ? C.accentDim : "transparent",
    border: `1px solid ${active ? C.accent : C.border}`, borderRadius: 8,
    color: active ? C.accent : C.textMuted, fontSize: 13, fontFamily: F.b, cursor: "pointer", fontWeight: active ? 600 : 400,
  }}>{children}</button>
);
const fadeIn = `@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); }}`;

/* ═══ SECTION 0: SPINAL CORD ANATOMY REVIEW ═══ */

const TERMINOLOGY = [
  ["Spinal cord", "Elongated, cylindrical part of the CNS extending from brainstem to lumbar region; transmits neural signals between brain and body"],
  ["Vertebrae", "Individual bones of the spinal column; protect and encase the spinal cord"],
  ["Spinal nerves", "31 pairs emerging from spinal cord segments; carry motor, sensory, and autonomic information"],
  ["Gray matter", "Inner layer (butterfly/H shape); neuron cell bodies, dendrites; integration center for reflexes"],
  ["White matter", "Outer layer of myelinated axons; three columns (funiculi); transmits signals up/down the cord"],
  ["Anterior (ventral) horn", "Gray matter containing motor neurons for voluntary and involuntary muscle movement"],
  ["Posterior (dorsal) horn", "Gray matter containing sensory neurons relaying information to the brain"],
  ["Lateral horn", "T1–L2 only; preganglionic sympathetic neurons (fight-or-flight)"],
  ["Ascending tracts", "White matter pathways: sensory info body → brain"],
  ["Descending tracts", "White matter pathways: motor commands brain → body"],
  ["Corticospinal tract", "Major descending tract for voluntary movement (cortex → spinal cord)"],
  ["Spinothalamic tract", "Ascending: nociception, temperature, crude touch → thalamus"],
  ["DCML", "Ascending: fine touch, vibration, conscious proprioception"],
  ["Intervertebral foramina", "Openings between vertebrae where spinal nerves exit"],
  ["Central canal", "Fluid-filled channel through cord center; CSF; continuous with brain ventricles"],
];

const SpinalCordAnatomy = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [view, setView] = useState("overview");

  return (
    <div>
      <SN>This foundational review covers spinal cord structure, protective layers, gray/white matter organization, and major tracts — all from Part 1 of your handout.</SN>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[["overview","Structure"],["tracts","Major Tracts"],["function","Functions"]].map(([k,l])=>(
          <TB key={k} active={view===k} onClick={()=>setView(k)}>{l}</TB>
        ))}
        <TB active={showTerms} onClick={()=>setShowTerms(!showTerms)}>{showTerms?"Hide":"Show"} Terminology</TB>
      </div>

      {showTerms && (
        <div style={{ marginBottom: 20, maxHeight: 380, overflowY: "auto", border: `1px solid ${C.border}`, borderRadius: 10, animation: "fadeIn 0.3s ease" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.b, fontSize: 13 }}>
            <thead><tr style={{ background: C.surfaceAlt, position: "sticky", top: 0 }}>
              <th style={{ padding: "8px 12px", textAlign: "left", color: C.accent, fontFamily: F.m, fontSize: 11, borderBottom: `1px solid ${C.border}` }}>TERM</th>
              <th style={{ padding: "8px 12px", textAlign: "left", color: C.accent, fontFamily: F.m, fontSize: 11, borderBottom: `1px solid ${C.border}` }}>DEFINITION</th>
            </tr></thead>
            <tbody>{TERMINOLOGY.map(([t,d],i)=>(
              <tr key={i} style={{ background: i%2===0?C.surface:C.surfaceAlt }}>
                <td style={{ padding: "8px 12px", color: C.text, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", verticalAlign: "top" }}>{t}</td>
                <td style={{ padding: "8px 12px", color: C.textMuted, borderBottom: `1px solid ${C.border}`, lineHeight: 1.5 }}>{d}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {view==="overview" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 16 }}>
            <div style={{ background: C.surfaceAlt, borderRadius: 10, padding: 20, border: `1px solid ${C.border}` }}>
              <h4 style={{ fontFamily: F.h, color: C.accent, fontSize: 15, margin: "0 0 10px" }}>Dimensions & Segments</h4>
              <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, fontFamily: F.b, margin: "0 0 12px" }}>
                ~45–48 cm (men) / ~43–45 cm (women). Diameter 1–1.5 cm. Extends from medulla oblongata to lumbar region.
              </p>
              <div style={{ padding: 12, background: C.surface, borderRadius: 6, fontFamily: F.m, fontSize: 12, color: C.textMuted, lineHeight: 1.8 }}>
                <span style={{color:C.plxC}}>■</span> 8 Cervical (C1–C8)<br/>
                <span style={{color:C.accent}}>■</span> 12 Thoracic (T1–T12)<br/>
                <span style={{color:C.plxL}}>■</span> 5 Lumbar (L1–L5)<br/>
                <span style={{color:C.plxS}}>■</span> 5 Sacral (S1–S5)<br/>
                <span style={{color:C.textDim}}>■</span> 1 Coccygeal (Co1)<br/>
                <strong style={{color:C.text}}>= 31 segments → 31 pairs of spinal nerves</strong>
              </div>
            </div>
            <div style={{ background: C.surfaceAlt, borderRadius: 10, padding: 20, border: `1px solid ${C.border}` }}>
              <h4 style={{ fontFamily: F.h, color: C.accent, fontSize: 15, margin: "0 0 10px" }}>Protective Layers</h4>
              <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, fontFamily: F.b, margin: "0 0 12px" }}>
                Protected by the <strong>vertebral column</strong> (33 vertebrae + intervertebral discs) and three <strong>meninges</strong>:
              </p>
              {[["Dura mater","Outermost tough membrane"],["Arachnoid mater","Middle (subdural space above)"],["Pia mater","Innermost, adheres to cord"]].map(([n,d],i)=>(
                <div key={i} style={{ fontSize: 13, color: C.text, fontFamily: F.b, marginBottom: 4 }}>
                  <span style={{color:C.accent,fontFamily:F.m,fontWeight:700,marginRight:6}}>{i+1}.</span><strong>{n}</strong> — {d}
                </div>
              ))}
              <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, fontFamily: F.b, marginTop: 10, marginBottom: 0 }}>
                Subarachnoid space (between arachnoid & pia) filled with <strong style={{color:C.text}}>CSF</strong> — cushioning, nourishment, waste removal.
              </p>
            </div>
          </div>

          <div style={{ background: C.surfaceAlt, borderRadius: 10, padding: 20, border: `1px solid ${C.border}` }}>
            <h4 style={{ fontFamily: F.h, color: C.text, fontSize: 16, margin: "0 0 16px" }}>Gray Matter vs. White Matter</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              <div style={{ padding: 16, background: C.surface, borderRadius: 8, border: `1px solid ${C.textDim}40` }}>
                <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.m, fontWeight: 700, marginBottom: 8 }}>GRAY MATTER (center, butterfly/H shape)</div>
                <div style={{ fontSize: 13, color: C.text, fontFamily: F.b, lineHeight: 1.7 }}>
                  Cell bodies, interneurons, glial cells. Four regions:
                  <div style={{marginTop:8}}>
                    <div style={{marginBottom:4}}><span style={{color:C.motor}}>▸</span> <strong>Anterior (ventral) horn</strong> — motor neurons → skeletal muscle</div>
                    <div style={{marginBottom:4}}><span style={{color:C.sensory}}>▸</span> <strong>Posterior (dorsal) horn</strong> — receives sensory input from PNS</div>
                    <div style={{marginBottom:4}}><span style={{color:C.mixed}}>▸</span> <strong>Lateral horn</strong> (T1–L2 only) — sympathetic autonomic neurons</div>
                    <div><span style={{color:C.textDim}}>▸</span> <strong>Gray commissure</strong> — connects halves; encloses central canal (CSF)</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: 16, background: C.surface, borderRadius: 8, border: `1px solid ${C.white}20` }}>
                <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.m, fontWeight: 700, marginBottom: 8 }}>WHITE MATTER (surrounds gray matter)</div>
                <div style={{ fontSize: 13, color: C.text, fontFamily: F.b, lineHeight: 1.7 }}>
                  Myelinated axons in three <strong>columns (funiculi)</strong>: anterior, lateral, posterior. Each contains tracts:
                  <div style={{marginTop:8}}>
                    <div style={{marginBottom:4}}><span style={{color:C.sensory}}>↑</span> <strong>Ascending</strong> — sensory body → brain</div>
                    <div><span style={{color:C.motor}}>↓</span> <strong>Descending</strong> — motor brain → body</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {view==="tracts" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeIn 0.3s ease" }}>
          {[
            { name: "Corticospinal Tract", dir: "Descending (motor)", color: C.motor, icon: "↓",
              desc: "Major tract for voluntary movement. Motor commands from cerebral cortex → spinal cord. Most fibers decussate at the medullary pyramids.",
              clinical: "Upper motor neuron lesion → spasticity, hyperreflexia, Babinski sign." },
            { name: "Spinothalamic Tract", dir: "Ascending (sensory)", color: C.sensory, icon: "↑",
              desc: "Transmits nociception (pain), temperature, and crude touch. Fibers enter via dorsal root → synapse in dorsal horn → cross in cord → ascend to thalamus.",
              clinical: "Cord hemisection (Brown-Séquard) → contralateral loss of pain/temperature below lesion." },
            { name: "Dorsal Column Medial Lemniscus (DCML)", dir: "Ascending (sensory)", color: C.plxC, icon: "↑",
              desc: "Fine (discriminative) touch, vibration, conscious proprioception. Enter via dorsal root → ascend ipsilaterally in posterior columns (gracile & cuneate fasciculi) → synapse in medulla → cross → thalamus.",
              clinical: "Posterior cord syndrome → ipsilateral loss of proprioception, vibration, fine touch." },
          ].map((t,i)=>(
            <div key={i} style={{ background: C.surfaceAlt, borderRadius: 10, padding: 20, border: `1px solid ${t.color}30` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{fontSize:20,color:t.color}}>{t.icon}</span>
                <h4 style={{fontFamily:F.h,color:t.color,fontSize:16,margin:0}}>{t.name}</h4>
                <span style={{fontSize:10,fontFamily:F.m,color:C.textMuted,background:C.surface,padding:"2px 8px",borderRadius:4}}>{t.dir}</span>
              </div>
              <p style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:F.b,margin:"0 0 10px"}}>{t.desc}</p>
              <div style={{padding:10,background:C.surface,borderRadius:6,fontSize:12,color:C.textMuted,fontFamily:F.b}}>
                <strong style={{color:t.color}}>Clinical:</strong> {t.clinical}
              </div>
            </div>
          ))}
        </div>
      )}

      {view==="function" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeIn 0.3s ease" }}>
          {[
            { title: "Motor Control", color: C.motor, pts: [
              "Coordinates voluntary movements via corticospinal tract → ventral horn motor neurons",
              "Controls involuntary movements (posture, balance)",
              "Coordinates reflexes: withdrawal reflex (noxious stimulus → limb retraction), stretch reflex (muscle lengthening → contraction)",
            ]},
            { title: "Sensory Processing", color: C.sensory, pts: [
              "Dorsal horns receive input from skin, muscle, organ receptors",
              "Relays to brain via ascending tracts (spinothalamic, DCML)",
            ]},
            { title: "Autonomic Regulation", color: C.mixed, pts: [
              "Lateral horns (T1–L2): preganglionic sympathetic neurons",
              "Regulates heart rate, blood pressure, digestion, temperature",
            ]},
            { title: "Integration & Communication", color: C.plxC, pts: [
              "Central pattern generators → rhythmic patterns (walking, breathing, swallowing)",
              "Bidirectional link: brain ↔ body for complex movement coordination and internal environment adjustment",
            ]},
          ].map((s,i)=>(
            <div key={i} style={{ background: C.surfaceAlt, borderRadius: 10, padding: 20, border: `1px solid ${s.color}30` }}>
              <h4 style={{fontFamily:F.h,color:s.color,fontSize:15,margin:"0 0 10px"}}>{s.title}</h4>
              {s.pts.map((p,j)=>(
                <div key={j} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
                  <span style={{color:s.color,fontSize:14,lineHeight:1.4}}>›</span>
                  <span style={{fontSize:13,color:C.text,lineHeight:1.5,fontFamily:F.b}}>{p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <style>{fadeIn}</style>
    </div>
  );
};


/* ═══ SECTION 1: DORSAL VS VENTRAL ROOTS ═══ */

const PART2_TERMS = [
  ["Dorsal root","Sensory input pathway into the spinal cord"],
  ["Dorsal root ganglion","Contains sensory neuron cell bodies outside the spinal cord"],
  ["Ventral root","Motor output pathway exiting the spinal cord"],
  ["Spinal nerve","Mixed nerve formed by union of dorsal and ventral roots"],
  ["Afferent","Sensory signal traveling toward the CNS"],
  ["Efferent","Motor signal traveling away from the CNS"],
  ["Dermatome","Skin area supplied by a single spinal nerve"],
  ["Myotome","Group of muscles innervated by a single spinal nerve"],
  ["Radiculopathy","Dysfunction or irritation of a spinal nerve root"],
];

const DorsalVentral = () => {
  const [hl, setHl] = useState(null);
  const [showTerms, setShowTerms] = useState(false);

  const info = {
    dorsal: { title: "Dorsal (Posterior) Root", color: C.sensory, details: [
      "Carries afferent (sensory) fibers INTO the spinal cord",
      "Sensory input: touch, proprioception, pain, temperature",
      "Cell bodies in the Dorsal Root Ganglion (pseudounipolar neurons)",
      "Fibers enter and synapse in the dorsal horn for processing",
    ]},
    ventral: { title: "Ventral (Anterior) Root", color: C.motor, details: [
      "Carries efferent (motor) fibers OUT of the spinal cord to muscles and glands",
      "Cell bodies of lower motor neurons located in the ventral horn",
      "Also carries preganglionic autonomic fibers at T1–L2 (from lateral horn)",
      "Contains multipolar alpha and gamma motor neurons",
    ]},
    drg: { title: "Dorsal Root Ganglion (DRG)", color: C.mixed, details: [
      "Located in or near the intervertebral foramen",
      "Contains cell bodies of primary sensory neurons (pseudounipolar)",
      "Single axon bifurcates: peripheral process → receptor, central process → dorsal horn",
      "Cell body does NOT synapse — signals pass through directly",
      "Vulnerable to disc herniation / foraminal stenosis → radiculopathy",
    ]},
    spinalnerve: { title: "Spinal Nerve (Mixed)", color: C.white, details: [
      "Formed by union of dorsal + ventral roots — very short segment",
      "MIXED nerve: both sensory (afferent) and motor (efferent) fibers",
      "Fibers remain separated near the cord, merge briefly in the spinal nerve",
      "Immediately divides into rami: ventral ramus → limbs/anterior trunk; dorsal ramus → posterior trunk",
      "31 pairs: 8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal",
    ]},
  };

  return (
    <div>
      <SN>Click each structure to review its anatomy and function. Pay attention to direction of information flow and where cell bodies are located.</SN>

      <TB active={showTerms} onClick={()=>setShowTerms(!showTerms)}>{showTerms?"Hide":"Show"} Part 2 Terminology</TB>

      {showTerms && (
        <div style={{ margin: "12px 0 20px", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", animation: "fadeIn 0.3s ease" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.b, fontSize: 13 }}>
            <thead><tr style={{background:C.surfaceAlt}}>
              <th style={{padding:"8px 12px",textAlign:"left",color:C.accent,fontFamily:F.m,fontSize:11,borderBottom:`1px solid ${C.border}`}}>TERM</th>
              <th style={{padding:"8px 12px",textAlign:"left",color:C.accent,fontFamily:F.m,fontSize:11,borderBottom:`1px solid ${C.border}`}}>DEFINITION</th>
            </tr></thead>
            <tbody>{PART2_TERMS.map(([t,d],i)=>(
              <tr key={i} style={{background:i%2===0?C.surface:C.surfaceAlt}}>
                <td style={{padding:"8px 12px",color:C.text,fontWeight:600,borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap",verticalAlign:"top"}}>{t}</td>
                <td style={{padding:"8px 12px",color:C.textMuted,borderBottom:`1px solid ${C.border}`,lineHeight:1.5}}>{d}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 16 }}>
        <svg viewBox="0 0 440 360" style={{ flex: "1 1 280px", maxWidth: 440, background: C.surfaceAlt, borderRadius: 12, border: `1px solid ${C.border}` }}>
          <ellipse cx="140" cy="170" rx="65" ry="85" fill={C.surface} stroke={C.borderLight} strokeWidth="2"/>
          <path d="M140,110 Q155,140 170,135 Q175,155 165,170 Q175,185 170,205 Q155,200 140,230 Q125,200 110,205 Q105,185 115,170 Q105,155 110,135 Q125,140 140,110Z" fill={C.surfaceAlt} stroke={C.textDim} strokeWidth="1.5"/>
          <path d="M170,125 Q220,95 280,80 Q310,75 330,90" fill="none" stroke={hl==="dorsal"?C.sensory:C.sensory+"90"} strokeWidth={hl==="dorsal"?5:3} strokeLinecap="round" style={{cursor:"pointer"}} onClick={()=>setHl("dorsal")}/>
          <polygon points="185,118 175,110 180,125" fill={C.sensory} opacity={hl==="dorsal"?1:0.6}/>
          <text x="240" y="68" fill={C.sensory} fontSize="11" fontFamily={F.m} fontWeight="600" style={{cursor:"pointer"}} onClick={()=>setHl("dorsal")}>DORSAL ROOT</text>
          <text x="240" y="82" fill={C.sensory} fontSize="9" fontFamily={F.m} opacity="0.7">(afferent → IN)</text>
          <ellipse cx="310" cy="90" rx="22" ry="14" fill={hl==="drg"?"rgba(255,217,61,0.3)":"rgba(255,217,61,0.12)"} stroke={C.mixed} strokeWidth={hl==="drg"?2.5:1.5} style={{cursor:"pointer"}} onClick={()=>setHl("drg")}/>
          <text x="310" y="94" fill={C.mixed} fontSize="9" fontFamily={F.m} fontWeight="700" textAnchor="middle" style={{cursor:"pointer"}} onClick={()=>setHl("drg")}>DRG</text>
          <path d="M170,215 Q220,245 280,260 Q310,265 340,250" fill="none" stroke={hl==="ventral"?C.motor:C.motor+"90"} strokeWidth={hl==="ventral"?5:3} strokeLinecap="round" style={{cursor:"pointer"}} onClick={()=>setHl("ventral")}/>
          <polygon points="280,255 270,268 288,264" fill={C.motor} opacity={hl==="ventral"?1:0.6}/>
          <text x="240" y="285" fill={C.motor} fontSize="11" fontFamily={F.m} fontWeight="600" style={{cursor:"pointer"}} onClick={()=>setHl("ventral")}>VENTRAL ROOT</text>
          <text x="240" y="299" fill={C.motor} fontSize="9" fontFamily={F.m} opacity="0.7">(efferent → OUT)</text>
          <path d="M330,90 Q360,120 370,170 Q360,220 340,250" fill="none" stroke={hl==="spinalnerve"?C.white:C.textDim} strokeWidth={hl==="spinalnerve"?4:2.5} strokeLinecap="round" strokeDasharray={hl==="spinalnerve"?"none":"6,4"} style={{cursor:"pointer"}} onClick={()=>setHl("spinalnerve")}/>
          <text x="380" y="160" fill={C.textMuted} fontSize="10" fontFamily={F.m} fontWeight="600" style={{cursor:"pointer"}} onClick={()=>setHl("spinalnerve")}>SPINAL</text>
          <text x="380" y="174" fill={C.textMuted} fontSize="10" fontFamily={F.m} fontWeight="600" style={{cursor:"pointer"}} onClick={()=>setHl("spinalnerve")}>NERVE</text>
          <text x="380" y="188" fill={C.textDim} fontSize="8" fontFamily={F.m}>(mixed)</text>
          <path d="M370,170 Q395,155 420,148" fill="none" stroke={C.textDim} strokeWidth="1.5" strokeDasharray="3,3"/>
          <text x="400" y="140" fill={C.textDim} fontSize="8" fontFamily={F.m}>dorsal ramus</text>
          <path d="M370,170 Q395,185 420,192" fill="none" stroke={C.textDim} strokeWidth="1.5" strokeDasharray="3,3"/>
          <text x="400" y="204" fill={C.textDim} fontSize="8" fontFamily={F.m}>ventral ramus</text>
          <text x="140" y="175" fill={C.textDim} fontSize="10" fontFamily={F.m} textAnchor="middle">gray matter</text>
          <text x="55" y="100" fill={C.textDim} fontSize="9" fontFamily={F.m}>DORSAL</text>
          <text x="55" y="245" fill={C.textDim} fontSize="9" fontFamily={F.m}>VENTRAL</text>
        </svg>
        <div style={{ flex: "1 1 200px", minWidth: 200 }}>
          {hl && info[hl] ? (
            <div style={{animation:"fadeIn 0.3s ease"}}>
              <h3 style={{fontFamily:F.h,color:info[hl].color,fontSize:18,margin:"0 0 12px"}}>{info[hl].title}</h3>
              {info[hl].details.map((d,i)=>(
                <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8}}>
                  <span style={{color:info[hl].color,fontSize:16,lineHeight:1.3}}>›</span>
                  <span style={{fontSize:13,color:C.text,lineHeight:1.5,fontFamily:F.b}}>{d}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{color:C.textDim,fontSize:14,fontFamily:F.b,padding:20,textAlign:"center",border:`1px dashed ${C.border}`,borderRadius:8}}>
              ← Click a structure in the diagram
            </div>
          )}
        </div>
      </div>

      <KeyConcept title="FUNCTIONAL ORGANIZATION OF SPINAL GRAY MATTER">
        <div style={{marginBottom:4}}><span style={{color:C.sensory}}>▸</span> <strong>Dorsal horn:</strong> Receives and processes sensory input</div>
        <div style={{marginBottom:4}}><span style={{color:C.motor}}>▸</span> <strong>Ventral horn:</strong> Contains motor neurons that control skeletal muscle</div>
        <div><span style={{color:C.mixed}}>▸</span> <strong>Lateral horn</strong> (T1–L2): Contains autonomic (sympathetic) neurons</div>
      </KeyConcept>
      <style>{fadeIn}</style>
    </div>
  );
};


/* ═══ SECTION 2: DRG DETAIL ═══ */
const DRGDetail = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <SN>The DRG houses the cell bodies of first-order sensory neurons and is the critical relay point for all somatic sensory information entering the spinal cord.</SN>
      <div style={{ background: C.surfaceAlt, borderRadius: 12, padding: 24, border: `1px solid ${C.border}` }}>
        <svg viewBox="0 0 500 220" style={{width:"100%"}}>
          <line x1="20" y1="110" x2="150" y2="110" stroke={C.sensory} strokeWidth="3" strokeDasharray="8,4"/>
          <text x="85" y="98" fill={C.sensory} fontSize="10" fontFamily={F.m} textAnchor="middle">peripheral process</text>
          <text x="20" y="140" fill={C.textDim} fontSize="9" fontFamily={F.m}>RECEPTOR</text>
          <text x="20" y="152" fill={C.textDim} fontSize="9" fontFamily={F.m}>(touch, pain,</text>
          <text x="20" y="164" fill={C.textDim} fontSize="9" fontFamily={F.m}>temp, proprio)</text>
          <ellipse cx="220" cy="110" rx="65" ry="50" fill="rgba(255,217,61,0.1)" stroke={C.mixed} strokeWidth="2.5"/>
          <text x="220" y="95" fill={C.mixed} fontSize="13" fontFamily={F.h} fontWeight="700" textAnchor="middle">Dorsal Root</text>
          <text x="220" y="115" fill={C.mixed} fontSize="13" fontFamily={F.h} fontWeight="700" textAnchor="middle">Ganglion</text>
          <text x="220" y="138" fill={C.textMuted} fontSize="9" fontFamily={F.m} textAnchor="middle">pseudounipolar cell bodies</text>
          {[{x:195,y:85},{x:240,y:90},{x:210,y:125},{x:235,y:120},{x:200,y:105},{x:245,y:108}].map((p,i)=>(
            <circle key={i} cx={p.x} cy={p.y} r="4" fill={C.mixed} opacity="0.4"/>
          ))}
          <line x1="285" y1="110" x2="400" y2="110" stroke={C.sensory} strokeWidth="3"/>
          <text x="342" y="98" fill={C.sensory} fontSize="10" fontFamily={F.m} textAnchor="middle">central process</text>
          <polygon points="400,110 390,104 390,116" fill={C.sensory}/>
          <rect x="400" y="60" width="80" height="100" rx="12" fill={C.surface} stroke={C.borderLight} strokeWidth="2"/>
          <text x="440" y="100" fill={C.textDim} fontSize="10" fontFamily={F.m} textAnchor="middle">DORSAL</text>
          <text x="440" y="115" fill={C.textDim} fontSize="10" fontFamily={F.m} textAnchor="middle">HORN</text>
          <text x="220" y="185" fill={C.textMuted} fontSize="10" fontFamily={F.m} textAnchor="middle">📍 In/near the intervertebral foramen</text>
        </svg>
      </div>
      <KeyConcept title="PSEUDOUNIPOLAR NEURON">
        Single axon bifurcates: <span style={{color:C.sensory}}>peripheral process</span> → sensory receptors; <span style={{color:C.sensory}}>central process</span> → dorsal horn. Cell body does <strong>NOT</strong> synapse — information passes through directly.
      </KeyConcept>
      <button onClick={()=>setShow(!show)} style={{ marginTop: 16, padding: "10px 20px", background: C.accentDim, border: `1px solid ${C.accent}`, borderRadius: 8, color: C.accent, fontFamily: F.b, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
        {show?"Hide":"Show"} Clinical Significance ▾
      </button>
      {show && <div style={{animation:"fadeIn 0.3s ease"}}><Pearl text="DRG compression (disc herniation, foraminal stenosis) → radiculopathy: radicular pain, paresthesias, dermatomal sensory loss. The DRG is also a target for DRG stimulation (DRG-S) in chronic pain management." /></div>}
      <style>{fadeIn}</style>
    </div>
  );
};


/* ═══ SECTION 3: SEGMENTAL VS PERIPHERAL + PLEXUS ═══ */
const SegmentalVsPeripheral = () => {
  const [view, setView] = useState("compare");
  return (
    <div>
      <SN>Understanding the difference between segmental innervation and peripheral nerve innervation is essential for clinical reasoning.</SN>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {[["compare","Compare Patterns"],["reorganize","Plexus Reorganization"]].map(([k,l])=>(
          <TB key={k} active={view===k} onClick={()=>setView(k)}>{l}</TB>
        ))}
      </div>

      {view==="compare" ? (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16,marginBottom:16}}>
            <div style={{background:C.surfaceAlt,borderRadius:12,padding:20,border:`2px solid ${C.sensory}`}}>
              <h3 style={{fontFamily:F.h,color:C.sensory,fontSize:16,margin:"0 0 12px"}}>Segmental Innervation</h3>
              <p style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:F.b}}>Distribution from a <strong>single spinal cord level</strong> or single spinal nerve/root.</p>
              <div style={{margin:"12px 0",padding:12,background:C.surface,borderRadius:8}}>
                <div style={{fontSize:11,color:C.sensory,fontFamily:F.m,fontWeight:700,marginBottom:6}}>EXAMPLE: C6 ROOT LESION</div>
                <p style={{fontSize:12,color:C.textMuted,lineHeight:1.5,fontFamily:F.b,margin:0}}>
                  Sensory: lateral forearm, thumb (C6 dermatome)<br/>Motor: wrist extension weakness (C6 myotome)<br/>Reflex: diminished brachioradialis
                </p>
              </div>
              <p style={{fontSize:12,color:C.textMuted,fontFamily:F.b,margin:0}}><strong style={{color:C.text}}>Dermatome</strong> = skin area from one root. <strong style={{color:C.text}}>Myotome</strong> = muscles from one root.</p>
            </div>
            <div style={{background:C.surfaceAlt,borderRadius:12,padding:20,border:`2px solid ${C.motor}`}}>
              <h3 style={{fontFamily:F.h,color:C.motor,fontSize:16,margin:"0 0 12px"}}>Peripheral Nerve Innervation</h3>
              <p style={{fontSize:13,color:C.text,lineHeight:1.6,fontFamily:F.b}}>Distribution within a <strong>named peripheral nerve</strong> containing fibers from <strong>multiple spinal levels</strong> (mixed in a plexus).</p>
              <div style={{margin:"12px 0",padding:12,background:C.surface,borderRadius:8}}>
                <div style={{fontSize:11,color:C.motor,fontFamily:F.m,fontWeight:700,marginBottom:6}}>EXAMPLE: MEDIAN NERVE LESION</div>
                <p style={{fontSize:12,color:C.textMuted,lineHeight:1.5,fontFamily:F.b,margin:0}}>
                  Contains C6–T1 fibers<br/>Motor: pronators, wrist flexors, thenar muscles<br/>Sensory: palmar thumb, index, middle, lat. ring finger
                </p>
              </div>
              <p style={{fontSize:12,color:C.textMuted,fontFamily:F.b,margin:0}}>C6 root weakness looks <strong style={{color:C.text}}>different</strong> from radial or median nerve weakness, even though those nerves carry C6 fibers.</p>
            </div>
          </div>
          <Pearl text="Root injury → segmental pattern (dermatome/myotome). Peripheral nerve injury → named nerve distribution. This distinction is the basis for differentiating radiculopathy from peripheral neuropathy." />
        </div>
      ) : (
        <div style={{background:C.surfaceAlt,borderRadius:12,padding:24,border:`1px solid ${C.border}`}}>
          <h3 style={{fontFamily:F.h,color:C.text,fontSize:16,margin:"0 0 8px"}}>How Plexuses Reorganize Spinal Nerve Fibers</h3>
          <div style={{fontSize:13,color:C.textMuted,lineHeight:1.6,fontFamily:F.b,marginBottom:16}}>
            <p style={{margin:"0 0 8px"}}>After leaving the cord, <strong style={{color:C.text}}>dorsal + ventral roots join briefly</strong> to form a mixed spinal nerve, which divides into <strong style={{color:C.text}}>rami</strong>.</p>
            <p style={{margin:"0 0 8px"}}>In the <strong style={{color:C.text}}>thorax</strong>, ventral rami generally remain segmental. In <strong style={{color:C.text}}>cervical and limb regions</strong>, ventral rami interweave to form <strong style={{color:C.text}}>nerve plexuses</strong>.</p>
            <p style={{margin:0}}>Within a plexus, fibers from <strong style={{color:C.text}}>multiple spinal levels are redistributed and combined</strong> → peripheral nerves containing axons from more than one spinal segment.</p>
          </div>
          <svg viewBox="0 0 530 280" style={{width:"100%"}}>
            {["C5","C6","C7","C8","T1"].map((r,i)=>{
              const y=30+i*55;const col=[C.plxC,C.plxB,C.accent,C.sensory,C.mixed][i];
              return <g key={r}><rect x="10" y={y-12} width="45" height="24" rx="4" fill={col+"33"} stroke={col} strokeWidth="1.5"/>
                <text x="32" y={y+4} fill={col} fontSize="12" fontFamily={F.m} fontWeight="700" textAnchor="middle">{r}</text></g>;
            })}
            {[["Upper","C5+C6",57],["Middle","C7",140],["Lower","C8+T1",222]].map(([n,d,y])=>(
              <g key={n}><rect x="130" y={y-15} width="80" height="30" rx="6" fill={C.surface} stroke={C.borderLight} strokeWidth="1.5"/>
                <text x="170" y={y+1} fill={C.text} fontSize="10" fontFamily={F.b} fontWeight="600" textAnchor="middle">{n}</text>
                <text x="170" y={y+13} fill={C.textDim} fontSize="8" fontFamily={F.m} textAnchor="middle">{d}</text></g>
            ))}
            <line x1="55" y1="30" x2="130" y2="52" stroke={C.plxC} strokeWidth="1.5" opacity="0.5"/>
            <line x1="55" y1="85" x2="130" y2="52" stroke={C.plxB} strokeWidth="1.5" opacity="0.5"/>
            <line x1="55" y1="140" x2="130" y2="140" stroke={C.accent} strokeWidth="1.5" opacity="0.5"/>
            <line x1="55" y1="195" x2="130" y2="222" stroke={C.sensory} strokeWidth="1.5" opacity="0.5"/>
            <line x1="55" y1="250" x2="130" y2="222" stroke={C.mixed} strokeWidth="1.5" opacity="0.5"/>
            <text x="265" y="15" fill={C.textDim} fontSize="9" fontFamily={F.m} textAnchor="middle">DIVISIONS</text>
            {[52,140,222].map((ty,i)=><g key={i}><line x1="210" y1={ty} x2="250" y2={ty-10} stroke={C.textDim} strokeWidth="1" opacity="0.4" strokeDasharray="3,3"/><line x1="210" y1={ty} x2="250" y2={ty+10} stroke={C.textDim} strokeWidth="1" opacity="0.4" strokeDasharray="3,3"/></g>)}
            {[["Lateral","C5–C7",80,C.plxB],["Posterior","C5–T1",150,C.mixed],["Medial","C8–T1",220,C.sensory]].map(([n,d,y,col])=>(
              <g key={n}><rect x="300" y={y-15} width="80" height="30" rx="6" fill={C.surface} stroke={col} strokeWidth="1.5"/>
                <text x="340" y={y+1} fill={col} fontSize="10" fontFamily={F.b} fontWeight="600" textAnchor="middle">{n}</text>
                <text x="340" y={y+13} fill={C.textDim} fontSize="8" fontFamily={F.m} textAnchor="middle">{d}</text></g>
            ))}
            {[["Musculocut.",50],["Median",90],["Axillary",135],["Radial",165],["Ulnar",215]].map(([n,y])=>(
              <g key={n}><line x1="380" y1={Math.min(Math.max(y,80),220)} x2="420" y2={y} stroke={C.textDim} strokeWidth="1" opacity="0.5"/>
                <text x="425" y={y+4} fill={C.text} fontSize="10" fontFamily={F.b}>{n}</text></g>
            ))}
            <text x="32" y="12" fill={C.textMuted} fontSize="9" fontFamily={F.m} textAnchor="middle">ROOTS</text>
            <text x="170" y="25" fill={C.textMuted} fontSize="9" fontFamily={F.m} textAnchor="middle">TRUNKS</text>
            <text x="340" y="55" fill={C.textMuted} fontSize="9" fontFamily={F.m} textAnchor="middle">CORDS</text>
            <text x="465" y="35" fill={C.textMuted} fontSize="9" fontFamily={F.m} textAnchor="middle">BRANCHES</text>
          </svg>
          <KeyConcept title="FUNCTIONAL REDUNDANCY">
            Because multiple spinal segments contribute to one peripheral nerve, <strong>single root damage may weaken but not eliminate a movement</strong>. Conversely, one peripheral nerve injury can affect muscles/skin from more than one spinal segment.
          </KeyConcept>
        </div>
      )}
      <style>{fadeIn}</style>
    </div>
  );
};


/* ═══ SECTION 4: DERMATOMES & MYOTOMES ═══ */
const DERM = [
  {l:"C2",r:"Posterior scalp, occiput",m:"Neck flexion"},
  {l:"C3",r:"Lateral neck",m:"Neck lateral flexion"},
  {l:"C4",r:"Upper shoulder / trapezius ridge",m:"Shoulder elevation"},
  {l:"C5",r:"Lateral arm (deltoid area)",m:"Elbow flexors (biceps, brachialis)",a:true},
  {l:"C6",r:"Lateral forearm, thumb, index finger",m:"Wrist extensors",a:true},
  {l:"C7",r:"Middle finger, posterior forearm",m:"Elbow extensors (triceps)",a:true},
  {l:"C8",r:"Medial forearm, ring & little fingers",m:"Finger flexors (FDP middle finger)",a:true},
  {l:"T1",r:"Medial elbow / proximal medial forearm",m:"Finger abductors (small finger)",a:true},
  {l:"T2",r:"Axilla and medial upper arm",m:"—"},
  {l:"T4",r:"Nipple line",m:"—"},
  {l:"T6",r:"Xiphoid process",m:"—"},
  {l:"T10",r:"Umbilicus",m:"—"},
  {l:"T12",r:"Inguinal ligament / pubic crest",m:"—"},
  {l:"L1",r:"Inguinal region, upper anterior thigh",m:"Hip flexion"},
  {l:"L2",r:"Anterior mid-thigh",m:"Hip flexors",a:true},
  {l:"L3",r:"Anterior distal thigh / knee",m:"Knee extensors (quads)",a:true},
  {l:"L4",r:"Medial leg, medial malleolus",m:"Ankle dorsiflexors",a:true},
  {l:"L5",r:"Lateral leg, dorsum of foot, great toe",m:"Long toe extensors (EHL)",a:true},
  {l:"S1",r:"Lateral foot, sole, lateral malleolus",m:"Ankle plantar flexors",a:true},
  {l:"S2",r:"Posterior thigh",m:"Knee flexion"},
  {l:"S3–S5",r:"Perianal region (saddle area)",m:"Voluntary anal contraction; pelvic floor"},
];

const DermatomeExplorer = () => {
  const [sel, setSel] = useState(null);
  const [showASIA, setShowASIA] = useState(false);
  const d = sel!==null ? DERM[sel] : null;

  return (
    <div>
      <SN>A <strong>dermatome</strong> = skin area from a single spinal nerve root. A <strong>myotome</strong> = muscles/movement from a single root. They help localize injury and distinguish radiculopathy from peripheral neuropathy.</SN>

      <TB active={showASIA} onClick={()=>setShowASIA(!showASIA)}>{showASIA?"Hide":"Show"} ASIA Key Muscles</TB>

      {showASIA && (
        <div style={{margin:"12px 0 16px",padding:16,background:C.surfaceAlt,borderRadius:10,border:`1px solid ${C.accent}40`,animation:"fadeIn 0.3s ease"}}>
          <div style={{fontSize:12,fontFamily:F.m,fontWeight:700,color:C.accent,marginBottom:10}}>ASIA KEY MUSCLES (ISNCSCI exam)</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:8}}>
            <div>
              <div style={{fontSize:11,fontFamily:F.m,color:C.textMuted,marginBottom:6}}>UPPER EXTREMITY</div>
              {[["C5","Elbow flexors"],["C6","Wrist extensors"],["C7","Elbow extensors"],["C8","Finger flexors"],["T1","Finger abductors"]].map(([l,m])=>(
                <div key={l} style={{fontSize:13,color:C.text,fontFamily:F.b,marginBottom:3}}><span style={{color:C.plxC,fontFamily:F.m,fontWeight:700}}>{l}</span> — {m}</div>
              ))}
            </div>
            <div>
              <div style={{fontSize:11,fontFamily:F.m,color:C.textMuted,marginBottom:6}}>LOWER EXTREMITY</div>
              {[["L2","Hip flexors"],["L3","Knee extensors"],["L4","Ankle dorsiflexors"],["L5","Long toe extensors"],["S1","Ankle plantar flexors"]].map(([l,m])=>(
                <div key={l} style={{fontSize:13,color:C.text,fontFamily:F.b,marginBottom:3}}><span style={{color:C.plxL,fontFamily:F.m,fontWeight:700}}>{l}</span> — {m}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12,marginBottom:12}}>
        {DERM.map((d,i)=>{
          const isC=d.l.startsWith("C"),isT=d.l.startsWith("T"),isL=d.l.startsWith("L");
          const bc=isC?C.plxC:isT?C.accent:isL?C.plxL:C.plxS;
          return <button key={i} onClick={()=>setSel(i)} style={{
            padding:"6px 12px",borderRadius:6,fontSize:12,fontFamily:F.m,fontWeight:600,cursor:"pointer",position:"relative",
            background:sel===i?bc+"33":C.surface,border:`1px solid ${sel===i?bc:C.border}`,color:sel===i?C.white:C.textMuted,
          }}>{d.l}{d.a&&<span style={{position:"absolute",top:-2,right:-2,width:6,height:6,borderRadius:"50%",background:C.accent}}/>}</button>;
        })}
      </div>
      <div style={{fontSize:11,color:C.textDim,fontFamily:F.m,marginBottom:12}}>
        <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:C.accent,marginRight:4}}/> = ASIA key muscle level
      </div>

      {d && (
        <div style={{background:C.surfaceAlt,borderRadius:12,padding:20,border:`1px solid ${C.border}`,animation:"fadeIn 0.3s ease"}}>
          <h3 style={{fontFamily:F.h,color:C.text,fontSize:20,margin:"0 0 16px"}}>{d.l} {d.a&&<span style={{fontSize:11,fontFamily:F.m,color:C.accent,background:C.accentDim,padding:"2px 8px",borderRadius:4}}>ASIA KEY</span>}</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16}}>
            <InfoCard color={C.sensory} label="DERMATOME">{d.r}</InfoCard>
            <InfoCard color={C.motor} label="MYOTOME">{d.m}</InfoCard>
          </div>
        </div>
      )}

      <Pearl text="Key landmarks: C5 = lateral arm, C6 = thumb, C7 = middle finger, C8 = little finger, T4 = nipple, T10 = umbilicus, L4 = medial malleolus, L5 = great toe dorsum, S1 = lateral foot. Dermatomal sensory loss → suspect root/cord lesion. Peripheral nerve distribution → suspect named nerve injury." />

      <KeyConcept title="CLINICAL APPLICATION (from handout)">
        Loss of sensation over lateral forearm and thumb → suspect <strong>C6</strong>. Weakness in ankle dorsiflexion → suspect <strong>L4–L5</strong>. Findings in a named peripheral nerve distribution → suspect <strong>peripheral nerve injury</strong> rather than root lesion.
      </KeyConcept>
      <style>{fadeIn}</style>
    </div>
  );
};


/* ═══ SECTION 5: PLEXUS EXPLORER ═══ */
const PX = {
  cervical: { name:"Cervical Plexus", levels:"C1–C4", color:C.plxC,
    desc:"Supplies structures of the neck and contributes to the phrenic nerve, which innervates the diaphragm.",
    nerves:[
      {name:"Lesser Occipital (C2)",type:"sensory",area:"Skin behind the ear"},
      {name:"Great Auricular (C2–C3)",type:"sensory",area:"Parotid gland and ear skin"},
      {name:"Transverse Cervical (C2–C3)",type:"sensory",area:"Anterior neck skin"},
      {name:"Supraclavicular (C3–C4)",type:"sensory",area:"Shoulder and upper chest skin"},
      {name:"Phrenic (C3–C5)",type:"motor",area:"Diaphragm — primary breathing muscle"},
      {name:"Ansa Cervicalis (C1–C3)",type:"motor",area:"Infrahyoid (strap) muscles"},
    ],
    pearl:"\"C3, 4, 5 keeps the diaphragm alive.\" Phrenic nerve injury → ipsilateral hemidiaphragm paralysis."
  },
  brachial: { name:"Brachial Plexus", levels:"C5–T1", color:C.plxB,
    desc:"Supplies the shoulder and entire upper limb. Organized: Roots → Trunks → Divisions → Cords → Branches.",
    nerves:[
      {name:"Musculocutaneous (C5–C7)",type:"mixed",area:"Biceps, brachialis, coracobrachialis; lateral forearm skin"},
      {name:"Axillary (C5–C6)",type:"mixed",area:"Deltoid, teres minor; regimental badge area"},
      {name:"Median (C6–T1)",type:"mixed",area:"Forearm flexors/pronators, thenar muscles; palmar lateral 3.5 digits"},
      {name:"Ulnar (C8–T1)",type:"mixed",area:"Interossei, hypothenar muscles; medial 1.5 digits"},
      {name:"Radial (C5–T1)",type:"mixed",area:"All extensors of arm/forearm; dorsal hand skin"},
      {name:"Long Thoracic (C5–C7)",type:"motor",area:"Serratus anterior"},
    ],
    pearl:"Erb-Duchenne palsy (C5–C6 upper trunk) → \"waiter's tip.\" Klumpke palsy (C8–T1 lower trunk) → \"claw hand.\" Long thoracic nerve injury → winged scapula."
  },
  lumbar: { name:"Lumbar Plexus", levels:"L1–L4", color:C.plxL,
    desc:"Supplies parts of the lower abdominal wall, anterior thigh, and medial leg. Forms within psoas major.",
    nerves:[
      {name:"Iliohypogastric (L1)",type:"mixed",area:"Abdominal muscles; suprapubic skin"},
      {name:"Ilioinguinal (L1)",type:"sensory",area:"Inguinal region, proximal medial thigh"},
      {name:"Lateral Femoral Cutaneous (L2–L3)",type:"sensory",area:"Lateral thigh skin"},
      {name:"Femoral (L2–L4)",type:"mixed",area:"Quadriceps, iliopsoas; anterior thigh and medial leg skin"},
      {name:"Obturator (L2–L4)",type:"mixed",area:"Adductors; medial thigh skin"},
    ],
    pearl:"Meralgia paresthetica = lateral femoral cutaneous nerve compression → burning/numbness lateral thigh."
  },
  sacral: { name:"Sacral Plexus", levels:"L4–S4", color:C.plxS,
    desc:"Supplies the posterior thigh, most of the lower leg, and the foot. Together with the lumbar plexus forms the lumbosacral plexus.",
    nerves:[
      {name:"Superior Gluteal (L4–S1)",type:"motor",area:"Gluteus medius, gluteus minimus, TFL"},
      {name:"Inferior Gluteal (L5–S2)",type:"motor",area:"Gluteus maximus"},
      {name:"Sciatic (L4–S3)",type:"mixed",area:"Hamstrings → divides into tibial & common fibular"},
      {name:"Tibial (L4–S3)",type:"mixed",area:"Posterior leg, plantar foot"},
      {name:"Common Fibular (L4–S2)",type:"mixed",area:"Anterior & lateral leg, dorsum of foot"},
      {name:"Pudendal (S2–S4)",type:"mixed",area:"Perineum, external genitalia, voluntary anal sphincter"},
    ],
    pearl:"Trendelenburg sign (superior gluteal nerve) → pelvis drops on unsupported side. Common fibular nerve injury at fibular head → foot drop."
  },
};

const PlexusExplorer = () => {
  const [act, setAct] = useState(null);
  const [nrv, setNrv] = useState(null);
  const d = act ? PX[act] : null;

  return (
    <div>
      <SN>The body contains four major nerve plexuses formed by the ventral rami of spinal nerves. The lumbar and sacral plexuses are sometimes considered together as the <strong>lumbosacral plexus</strong>.</SN>

      <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
        {Object.entries(PX).map(([k,v])=>(
          <button key={k} onClick={()=>{setAct(k);setNrv(null);}} style={{
            padding:"12px 20px",borderRadius:10,cursor:"pointer",transition:"all 0.2s",textAlign:"left",
            background:act===k?v.color+"20":C.surface,border:`2px solid ${act===k?v.color:C.border}`,
            color:act===k?v.color:C.textMuted,fontFamily:F.b,fontSize:14,fontWeight:600,
          }}><div>{v.name}</div><div style={{fontSize:11,fontFamily:F.m,opacity:0.7,marginTop:2}}>{v.levels}</div></button>
        ))}
      </div>

      {d && (
        <div style={{animation:"fadeIn 0.3s ease"}}>
          <div style={{background:C.surfaceAlt,borderRadius:12,padding:20,border:`1px solid ${d.color}40`,marginBottom:16}}>
            <h3 style={{fontFamily:F.h,color:d.color,fontSize:20,margin:"0 0 8px"}}>{d.name} <span style={{fontSize:14,color:C.textMuted,fontFamily:F.m}}>({d.levels})</span></h3>
            <p style={{fontSize:14,color:C.text,fontFamily:F.b,lineHeight:1.6,margin:0}}>{d.desc}</p>
          </div>
          <div style={{fontSize:12,fontFamily:F.m,color:C.textMuted,marginBottom:10,fontWeight:600}}>MAJOR BRANCHES — click to expand:</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {d.nerves.map((n,i)=>(
              <button key={i} onClick={()=>setNrv(nrv===i?null:i)} style={{
                background:nrv===i?C.surface:C.surfaceAlt,border:`1px solid ${nrv===i?d.color:C.border}`,
                borderRadius:8,padding:"12px 16px",cursor:"pointer",textAlign:"left",transition:"all 0.2s",
              }}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontFamily:F.b,fontSize:14,color:C.text,fontWeight:500}}>{n.name}</span>
                    <Badge type={n.type}/>
                  </div>
                  <span style={{color:C.textDim,fontSize:16,transform:nrv===i?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
                </div>
                {nrv===i && (
                  <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`,fontSize:13,color:C.textMuted,fontFamily:F.b,lineHeight:1.5,animation:"fadeIn 0.2s ease"}}>
                    <strong style={{color:C.text}}>Innervation:</strong> {n.area}
                  </div>
                )}
              </button>
            ))}
          </div>
          <Pearl text={d.pearl}/>
        </div>
      )}
      <style>{fadeIn}</style>
    </div>
  );
};


/* ═══ QUIZ ENGINE ═══ */
const QZ = {
  obj0: [
    {q:"The spinal cord has how many segments?",o:["26","29","31","33"],a:2,e:"31 segments: 8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal."},
    {q:"The lateral horn is found at which levels and contains what type of neurons?",o:["C1–C8; motor","T1–L2; preganglionic sympathetic","L1–S5; parasympathetic","All levels; interneurons"],a:1,e:"Lateral horn is present only at T1–L2, containing preganglionic sympathetic neurons."},
    {q:"Which tract transmits fine touch, vibration, and proprioception?",o:["Spinothalamic","Corticospinal","DCML","Reticulospinal"],a:2,e:"The DCML carries fine touch, vibration, and conscious proprioception. Spinothalamic carries pain, temperature, crude touch."},
    {q:"The gray matter of the spinal cord is shaped like a:",o:["Circle","Butterfly or H","Triangle","Rectangle"],a:1,e:"Gray matter is butterfly/H-shaped, located centrally, containing neuron cell bodies."},
  ],
  obj1: [
    {q:"A patient has motor weakness but intact sensation. Which structure is most likely damaged?",o:["Dorsal root","Ventral root","Both roots","DRG"],a:1,e:"Ventral root carries efferent (motor) fibers. Damage → weakness with preserved sensation."},
    {q:"Cell bodies of lower motor neurons are located in the:",o:["Dorsal root ganglion","Posterior horn","Anterior (ventral) horn","Lateral horn"],a:2,e:"Lower motor neuron cell bodies are in the ventral horn; their axons exit via the ventral root."},
    {q:"A dorsal root lesion at L4 would most likely cause:",o:["Weakness of ankle dorsiflexion","Loss of sensation over medial leg","Spastic paralysis","Increased reflexes"],a:1,e:"Dorsal root = sensory. L4 dorsal root damage → sensory loss in L4 dermatome (medial leg). Motor via ventral root is spared."},
    {q:"Each spinal nerve is described as a \"mixed\" nerve because it:",o:["Contains only motor fibers","Carries both sensory and motor fibers","Connects to multiple plexuses","Contains CNS and PNS tissue"],a:1,e:"Spinal nerves carry both sensory (afferent) and motor (efferent) fibers — they are mixed."},
  ],
  obj2: [
    {q:"The DRG is located:",o:["Within the spinal cord gray matter","In/near the intervertebral foramen","Anterior to the vertebral body","In the ventral horn"],a:1,e:"The DRG sits in or just outside the intervertebral foramen."},
    {q:"DRG compression at C6 would most likely produce:",o:["Weakness of wrist extensors only","Pain and paresthesias in the C6 dermatome","Bilateral sensory loss","Upper motor neuron signs"],a:1,e:"DRG houses sensory cell bodies. Compression → radiculopathy: pain/tingling in C6 distribution (lateral forearm, thumb)."},
  ],
  obj3: [
    {q:"Segmental innervation refers to distribution from:",o:["A named peripheral nerve","A single spinal cord level","Multiple spinal levels combined","The autonomic system"],a:1,e:"Segmental = single spinal level. Dermatome/myotome patterns are segmental."},
    {q:"Median nerve damage (C6–T1) illustrates:",o:["Segmental innervation","Peripheral nerve innervation","Dermatomal distribution","UMN pathology"],a:1,e:"Peripheral nerves contain fibers from multiple roots mixed in the plexus."},
    {q:"Why might single root damage weaken but not eliminate a movement?",o:["Brain compensates","Plexus redundancy — multiple roots contribute to each nerve","Motor neurons regenerate","Only sensory fibers in roots"],a:1,e:"Functional redundancy from plexus reorganization means other roots still contribute."},
  ],
  obj4: [
    {q:"In the thorax, ventral rami generally:",o:["Form plexuses","Remain segmental","Only carry autonomic fibers","Join dorsal rami"],a:1,e:"Per handout: thoracic ventral rami remain segmental. Plexuses form in cervical and limb regions."},
    {q:"Brachial plexus organization is:",o:["Roots → divisions → trunks → cords","Roots → trunks → divisions → cords → branches","Roots → cords → trunks → branches","Roots → branches → cords"],a:1,e:"Roots (C5–T1) → Trunks → Divisions → Cords → Branches."},
  ],
  obj5: [
    {q:"Loss of sensation over lateral forearm and thumb suggests:",o:["C5","C6","C7","C8"],a:1,e:"C6 dermatome = lateral forearm, thumb, index finger. Directly from handout."},
    {q:"Weakness in ankle dorsiflexion suggests:",o:["L2–L3","L3–L4","L4–L5","S1–S2"],a:2,e:"Handout states ankle dorsiflexion weakness may suggest L4–L5. L4 = ASIA key muscle for dorsiflexors."},
    {q:"Saddle anesthesia (S3–S5) + bowel/bladder dysfunction suggests:",o:["Simple disc herniation","Cauda equina syndrome","T10 cord lesion","Peripheral neuropathy"],a:1,e:"Saddle anesthesia + sphincter dysfunction = cauda equina syndrome — surgical emergency."},
    {q:"ASIA key muscle for L5 is:",o:["Hip flexors","Knee extensors","Long toe extensors","Ankle plantar flexors"],a:2,e:"L5 = long toe extensors (EHL). S1 = ankle plantar flexors."},
  ],
  obj6: [
    {q:"The sacral plexus is formed by:",o:["L1–L4","L4–S4","S1–S5","C5–T1"],a:1,e:"Sacral plexus = L4–S4. Gives rise to sciatic, gluteal, and pudendal nerves."},
    {q:"The lumbar and sacral plexuses together form the:",o:["Cervicobrachial plexus","Thoracolumbar plexus","Lumbosacral plexus","Sacrococcygeal plexus"],a:2,e:"Per handout: sometimes considered together as the lumbosacral plexus because they supply the lower limb together."},
    {q:"\"C3, 4, 5 keeps the diaphragm alive\" refers to a nerve from which plexus?",o:["Cervical","Brachial","Lumbar","Sacral"],a:0,e:"Phrenic nerve (C3–C5) arises primarily from the cervical plexus (C1–C4, with C5 contribution)."},
    {q:"Trendelenburg sign results from injury to which nerve?",o:["Femoral","Superior gluteal","Sciatic","Obturator"],a:1,e:"Superior gluteal nerve (L4–S1, sacral plexus) → gluteus medius/minimus. Injury → pelvis drop."},
  ],
};

const Quiz = ({questions}) => {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [show,setShow]=useState(false);
  const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const q=questions[cur];
  const pick=i=>{if(sel!==null)return;setSel(i);setShow(true);if(i===q.a)setScore(s=>s+1);};
  const next=()=>{if(cur+1>=questions.length)setDone(true);else{setCur(c=>c+1);setSel(null);setShow(false);}};
  const reset=()=>{setCur(0);setSel(null);setShow(false);setScore(0);setDone(false);};

  if(done){const pct=Math.round(score/questions.length*100);return(
    <div style={{textAlign:"center",padding:32}}>
      <div style={{fontSize:48,marginBottom:8}}>{pct>=80?"🎉":pct>=50?"👍":"📚"}</div>
      <h3 style={{fontFamily:F.h,color:C.text,fontSize:24,margin:"0 0 8px"}}>{score}/{questions.length} ({pct}%)</h3>
      <p style={{color:C.textMuted,fontFamily:F.b,fontSize:14}}>{pct>=80?"Excellent!":pct>=50?"Good — review content above for missed areas.":"Review interactive content above before retrying."}</p>
      <button onClick={reset} style={{marginTop:16,padding:"10px 24px",background:C.accent,border:"none",borderRadius:8,color:C.bg,fontFamily:F.b,fontSize:14,fontWeight:600,cursor:"pointer"}}>Retry</button>
    </div>
  );}

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
        <span style={{fontSize:12,fontFamily:F.m,color:C.textMuted}}>Q {cur+1}/{questions.length}</span>
        <span style={{fontSize:12,fontFamily:F.m,color:C.accent}}>{score} correct</span>
      </div>
      <div style={{background:C.surface,borderRadius:8,padding:2,marginBottom:16,height:4}}>
        <div style={{background:C.accent,borderRadius:8,height:"100%",width:`${(cur+1)/questions.length*100}%`,transition:"width 0.3s"}}/>
      </div>
      <p style={{fontFamily:F.b,fontSize:15,color:C.text,lineHeight:1.6,marginBottom:16}}>{q.q}</p>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {q.o.map((opt,i)=>{
          let bg=C.surface,bc=C.border;
          if(sel!==null){if(i===q.a){bg=C.correct+"26";bc=C.correct;}else if(i===sel){bg=C.incorrect+"26";bc=C.incorrect;}}
          return <button key={i} onClick={()=>pick(i)} style={{
            padding:"12px 16px",background:bg,border:`1px solid ${bc}`,borderRadius:8,textAlign:"left",
            cursor:sel!==null?"default":"pointer",fontFamily:F.b,fontSize:14,color:C.text,transition:"all 0.2s",
          }}><span style={{fontFamily:F.m,fontSize:12,color:C.textDim,marginRight:10}}>{String.fromCharCode(65+i)}.</span>{opt}
            {sel!==null&&i===q.a&&<span style={{float:"right",color:C.correct}}>✓</span>}
            {sel===i&&i!==q.a&&<span style={{float:"right",color:C.incorrect}}>✗</span>}
          </button>;
        })}
      </div>
      {show&&(
        <div style={{marginTop:16,padding:16,background:sel===q.a?C.correct+"14":C.incorrect+"14",border:`1px solid ${sel===q.a?C.correct:C.incorrect}40`,borderRadius:8,animation:"fadeIn 0.3s ease"}}>
          <div style={{fontSize:12,fontFamily:F.m,fontWeight:700,color:sel===q.a?C.correct:C.incorrect,marginBottom:6}}>{sel===q.a?"✓ CORRECT":"✗ INCORRECT"}</div>
          <p style={{fontSize:13,color:C.text,fontFamily:F.b,lineHeight:1.6,margin:0}}>{q.e}</p>
        </div>
      )}
      {show&&<button onClick={next} style={{marginTop:16,padding:"10px 24px",background:C.accent,border:"none",borderRadius:8,color:C.bg,fontFamily:F.b,fontSize:14,fontWeight:600,cursor:"pointer"}}>{cur+1>=questions.length?"See Results":"Next →"}</button>}
      <style>{fadeIn}</style>
    </div>
  );
};


/* ═══ MAIN APP ═══ */
const SECS = [
  {key:"s0",num:"0",label:"Spinal Cord Anatomy",title:"Part 1: Spinal Cord Anatomy Review",qk:"obj0"},
  {key:"s1",num:"1",label:"Dorsal vs Ventral Roots",title:"Obj 1: Dorsal/Ventral Roots & Spinal Nerve Formation",qk:"obj1"},
  {key:"s2",num:"2",label:"DRG Detail",title:"Obj 2: The Dorsal Root Ganglion",qk:"obj2"},
  {key:"s3",num:"3-4",label:"Segmental vs Peripheral",title:"Obj 3–4: Segmental vs. Peripheral Innervation & Plexus Reorganization",qk:"obj3"},
  {key:"s4",num:"5",label:"Dermatomes & Myotomes",title:"Obj 5: Dermatomes, Myotomes & ASIA Key Muscles",qk:"obj5"},
  {key:"s5",num:"6",label:"Plexus Explorer",title:"Obj 6: The Four Major Plexuses",qk:"obj6"},
];

export default function App(){
  const [sec,setSec]=useState("s0");
  const [showQ,setShowQ]=useState(false);
  const tabsRef=useRef(null);
  const s=SECS.find(x=>x.key===sec);
  const qqs=sec==="s3"?[...QZ.obj3,...QZ.obj4]:(QZ[s.qk]||[]);

  useEffect(()=>{setShowQ(false);},[sec]);
  useEffect(()=>{
    if(tabsRef.current){const el=tabsRef.current.querySelector('[data-active="true"]');if(el)el.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});}
  },[sec]);

  return(
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.b}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet"/>

      <div style={{padding:"32px 24px 24px",maxWidth:920,margin:"0 auto"}}>
        <div style={{fontSize:11,fontFamily:F.m,color:C.accent,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>DPTD 731 — Foundational Movement Science</div>
        <h1 style={{fontFamily:F.h,fontSize:26,fontWeight:700,color:C.text,margin:"0 0 6px",lineHeight:1.2}}>The Spinal Cord & Innervation</h1>
        <p style={{fontSize:14,color:C.textMuted,margin:0}}>Interactive Learning Module — explore each section, then test yourself with the quiz.</p>
      </div>

      <div ref={tabsRef} style={{padding:"0 24px",maxWidth:920,margin:"0 auto",display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
        {SECS.map(x=>(
          <div key={x.key} data-active={sec===x.key?"true":"false"}>
            <button onClick={()=>setSec(x.key)} style={{
              padding:"10px 16px",background:sec===x.key?C.accentDim:"transparent",
              border:`1px solid ${sec===x.key?C.accent:C.border}`,borderRadius:8,
              color:sec===x.key?C.accent:C.textMuted,fontFamily:F.b,fontSize:13,
              fontWeight:sec===x.key?600:400,cursor:"pointer",display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap",
            }}>
              <span style={{width:22,height:22,borderRadius:"50%",background:sec===x.key?C.accent:C.border,color:sec===x.key?C.bg:C.textMuted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>{x.num}</span>
              {x.label}
            </button>
          </div>
        ))}
      </div>

      <div style={{padding:"24px 24px 48px",maxWidth:920,margin:"0 auto"}}>
        <h2 style={{fontFamily:F.h,fontSize:20,color:C.text,margin:"0 0 20px",borderBottom:`1px solid ${C.border}`,paddingBottom:12}}>{s.title}</h2>

        {sec==="s0"&&<SpinalCordAnatomy/>}
        {sec==="s1"&&<DorsalVentral/>}
        {sec==="s2"&&<DRGDetail/>}
        {sec==="s3"&&<SegmentalVsPeripheral/>}
        {sec==="s4"&&<DermatomeExplorer/>}
        {sec==="s5"&&<PlexusExplorer/>}

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:24,marginTop:24}}>
          <button onClick={()=>setShowQ(!showQ)} style={{
            padding:"12px 24px",background:showQ?C.surface:C.accent,
            border:showQ?`1px solid ${C.border}`:"none",borderRadius:10,
            color:showQ?C.textMuted:C.bg,fontFamily:F.b,fontSize:15,fontWeight:600,cursor:"pointer",width:"100%",
          }}>{showQ?"Hide Quiz":`📝 Self-Check Quiz — ${s.label}`}</button>
          {showQ&&qqs.length>0&&(
            <div style={{marginTop:20,background:C.surfaceAlt,borderRadius:12,padding:24,border:`1px solid ${C.border}`}}>
              <Quiz key={sec} questions={qqs}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
