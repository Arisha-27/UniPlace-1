import { mockCompanies } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function CompaniesPOC() {
  const [search, setSearch] = useState("");
  const filtered = mockCompanies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.pocName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-header">Companies & POC Database</h1>
      <p className="page-subtitle">Company and point-of-contact directory</p>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Companies Table */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Companies</h2>
          <div className="data-table">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Name", "Industry", "Location", "Offers"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{c.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.industry}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.location}</td>
                    <td className="px-4 py-3 text-sm font-medium text-primary">{c.totalOffers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* POC Table */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Point of Contact</h2>
          <div className="data-table">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Company", "POC Name", "Email", "Phone"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{c.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.pocName}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.pocEmail}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.pocPhone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
