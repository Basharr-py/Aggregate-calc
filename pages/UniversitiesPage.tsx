import { useEffect, useMemo, useState } from "react";
import { Search, ExternalLink, Loader2 } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { getUniversities } from "../api/university";
import type { University } from "../types/university";
import styles from "./UniversitiesPage.module.css";

/**
 * Normalizes is_active across whatever shape the API actually sends it as
 * (real boolean, "true"/"false" string, or 1/0 number) rather than assuming
 * one specific type. Safer than a bare truthy check since 0 and "0" are
 * both truthy-adjacent traps in JS.
 */
function isActive(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") return value.toLowerCase() === "true" || value === "1";
  return false;
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadUniversities() {
      try {
        setIsLoading(true);
        const data = await getUniversities();
        console.log("First university (full):", JSON.stringify(data[0], null, 2)); // TEMP DEBUG
        setUniversities(data.filter((u: University) => isActive(u.is_active)));
      } catch (error) {
        setErrorMessage("Unable to load universities. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadUniversities();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return universities;
    return universities.filter(
      (u) => u.name.toLowerCase().includes(q) || u.short_name.toLowerCase().includes(q)
    );
  }, [universities, search]);

  return (
    <>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>University Directory</span>
          <h1 className={styles.title}>Every supported university, in one place</h1>
          <p className={styles.subhead}>
            Search to find admission details for the school you're applying to.
          </p>
        </div>
      </section>

      <section className={styles.controlsSection}>
        <div className={styles.inner}>
          <div className={styles.controls}>
            <div className={styles.searchWrap}>
              <Search size={16} className={styles.searchIcon} strokeWidth={2} />
              <input
                type="text"
                placeholder="Search by university name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {!isLoading && !errorMessage && (
            <p className={styles.resultCount}>
              {filtered.length} {filtered.length === 1 ? "university" : "universities"}
            </p>
          )}
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.inner}>
          {isLoading && (
            <div className={styles.stateMessage}>
              <Loader2 size={20} className={styles.spinner} strokeWidth={2} />
              Loading universities...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className={styles.stateMessage}>{errorMessage}</div>
          )}

          {!isLoading && !errorMessage && filtered.length === 0 && (
            <div className={styles.stateMessage}>
              No universities match your search. Try a different name.
            </div>
          )}

          {!isLoading && !errorMessage && filtered.length > 0 && (
            <div className={styles.grid}>
              {filtered.map((u) => (
                <div key={u.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    {u.logo_url ? (
                      <img src={u.logo_url} alt={`${u.name} logo`} className={styles.logo} />
                    ) : (
                      <div className={styles.logoFallback}>{u.short_name.slice(0, 3)}</div>
                    )}
                    <span className={styles.ownershipBadge}>{u.ownership}</span>
                  </div>

                  <h3 className={styles.cardName}>{u.name}</h3>
                  <p className={styles.cardState}>{u.state} State</p>

                  {u.screening_type === "POST_UTME" && (
                    <span className={styles.screeningTag}>Post-UTME Required</span>
                  )}

                  <div className={styles.cardFooter}>
                    {u.website && (
                      <a
                        href={u.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.websiteLink}
                      >
                        Official site
                        <ExternalLink size={13} strokeWidth={2.2} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}