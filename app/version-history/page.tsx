import { pageMetadata } from "@/lib/site";
import { repo } from "@/lib/repo";
import { getVersionHistory } from "@/lib/version-history";

export const metadata = pageMetadata("/version-history", "Version history | Col", "Changes to Col from merged pull requests on GitHub.");
export const revalidate = 300;

export default async function VersionHistoryPage() {
  const changes = await getVersionHistory();

  return (
    <div className="cb">
      <header className="cb-head">
        <div>
          <h1>Version history</h1>
          <p className="cb-lead">Merged changes to Col. Refreshes automatically from GitHub.</p>
        </div>
      </header>
      {changes?.length ? (
        <ul className="version-history">
          {changes.map((change) => (
            <li key={change.number}>
              <a href={repo.pull(change.number)}>
                <span>#{change.number}</span>
                <span>{change.title}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="cb-lead">{changes === null ? "Version history could not be loaded right now." : "No pull requests have been merged into main yet."}</p>
      )}
      <p className="cb-lead"><a href={repo.pulls}>View pull requests on GitHub</a></p>
    </div>
  );
}
