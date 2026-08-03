import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./UniversitiesSection.module.css";

// Placeholder abbreviations — swap for real logo images when available.
// The card is built to accept a `logo` src later without changing layout.
const universities = [
  { abbr: "UI", name: "University of Ibadan" },
  { abbr: "UNILAG", name: "University of Lagos" },
  { abbr: "OAU", name: "Obafemi Awolowo University" },
  { abbr: "UNILORIN", name: "University of Ilorin" },
  { abbr: "ABU", name: "Ahmadu Bello University" },
  { abbr: "UNIBEN", name: "University of Benin" },
  { abbr: "UNN", name: "University of Nigeria, Nsukka" },
  { abbr: "COVENANT", name: "Covenant University" },
  { abbr: "FUTA", name: "Federal University of Technology, Akure" },
  { abbr: "LASU", name: "Lagos State University" },
];

export default function UniversitiesSection() {
  return (
    <section id="universities" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Supported Universities</span>
          <h2 className={styles.title}>
            Cut-offs and requirements for the schools you're actually applying to
          </h2>
        </div>

        <div className={styles.grid}>
          {universities.map((u) => (
            <div key={u.abbr} className={styles.card}>
              <span className={styles.abbr}>{u.abbr}</span>
              <span className={styles.name}>{u.name}</span>
            </div>
          ))}
        </div>

        <div className={styles.footerRow}>
          <Link to="/universities" className={styles.viewAllBtn}>
            View All Universities
            <ArrowRight size={16} strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </section>
  );
}