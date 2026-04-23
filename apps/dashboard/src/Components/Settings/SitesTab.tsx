import { Plus, Check, X, Copy, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSites } from "../../Hooks/useSite";
import { Site } from "../../Type";
import { Card } from "../ui/Card";
import { inputClass } from "../ui/styles";
import { SectionHeader } from "../ui/SettingsUi";

export const SitesTab = () => {
  const {
    sitesQuery,
    addSiteMutation,
    renameSiteMutation,
    deleteSiteMutation,
  } = useSites();
  const sites = sitesQuery.data ?? [];
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addSiteMutation.mutate(newName, { onSuccess: () => setNewName("") });
  };

  const handleRename = (siteId: string) => {
    if (!editName.trim()) return;
    renameSiteMutation.mutate(
      { siteId, name: editName },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditName("");
        },
      },
    );
  };

  const handleDelete = (siteId: string) => {
    deleteSiteMutation.mutate(siteId, {
      onSuccess: () => setConfirmDelete(null),
    });
  };

  const copyId = (siteId: string) => {
    navigator.clipboard.writeText(siteId);
    setCopied(siteId);
    toast.success("Site ID copied");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Add new site */}
      <Card>
        <SectionHeader
          title="Add a new site"
          sub="Each site gets a unique ID for the widget script tag"
        />
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="my-website"
            className={`${inputClass} flex-1`}
          />
          <button
            type="submit"
            disabled={addSiteMutation.isPending}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--amber)] text-[#0e0e0f] font-mono text-xs font-medium hover:opacity-90 disabled:opacity-50 transition-opacity flex-shrink-0"
          >
            {addSiteMutation.isPending ? (
              <span className="w-3.5 h-3.5 border border-[#0e0e0f] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Plus size={13} />
            )}
            Add site
          </button>
        </form>
      </Card>

      {/* Site list */}
      <Card>
        <SectionHeader
          title="Your sites"
          sub={`${sites.length} site${sites.length !== 1 ? "s" : ""} connected`}
        />
        {sites.length === 0 ? (
          <p className="font-mono text-xs text-[var(--text-dim)] py-4">
            No sites yet — add one above.
          </p>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {sites.map((site: Site) => (
              <div key={site.siteId} className="py-4 first:pt-0 last:pb-0">
                {editingId === site.siteId ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleRename(site.siteId)
                      }
                      className={`${inputClass} flex-1`}
                      autoFocus
                    />
                    <button
                      onClick={() => handleRename(site.siteId)}
                      disabled={renameSiteMutation.isPending}
                      className="p-2 text-[var(--green)] hover:opacity-70 transition-opacity"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <p className="font-mono text-sm text-[var(--text)] font-medium">
                        {site.name}
                      </p>
                      <button
                        onClick={() => copyId(site.siteId)}
                        className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--amber)] transition-colors mt-0.5"
                      >
                        {copied === site.siteId ? (
                          <Check size={10} className="text-[var(--green)]" />
                        ) : (
                          <Copy size={10} />
                        )}
                        {site.siteId}
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingId(site.siteId);
                          setEditName(site.name);
                        }}
                        className="p-2 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--amber)] hover:bg-[var(--amber-bg)] transition-colors"
                        title="Rename"
                      >
                        <Pencil size={13} />
                      </button>
                      {confirmDelete === site.siteId ? (
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-xs text-[var(--red)]">
                            Delete?
                          </span>
                          <button
                            onClick={() => handleDelete(site.siteId)}
                            disabled={deleteSiteMutation.isPending}
                            className="px-2 py-1 font-mono text-xs bg-[var(--red-bg)] text-[var(--red)] border border-[var(--red)]/30 hover:opacity-70 transition-opacity"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-2 py-1 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(site.siteId)}
                          className="p-2 text-[var(--text-dim)] hover:text-[var(--red)] hover:bg-[var(--red-bg)] transition-colors"
                          title="Delete site"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
