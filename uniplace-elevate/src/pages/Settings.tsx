import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    collegeName: "Indira Gandhi Delhi Technical University for Women",
    adminEmail: "tnp@igdtuw.ac.in",
    notifyOnApplication: true,
    notifyOnResult: true,
    autoSyncSheets: true,
    placementYear: "2026",
  });

  const handleSave = () => {
    toast({ title: "Settings saved successfully" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-header">Settings</h1>
      <p className="page-subtitle">Configure dashboard preferences</p>

      <div className="max-w-2xl space-y-6">
        <div className="stat-card space-y-4">
          <h3 className="text-lg font-semibold text-foreground">General</h3>
          <div>
            <Label>College Name</Label>
            <Input value={settings.collegeName} onChange={e => setSettings(p => ({ ...p, collegeName: e.target.value }))} className="mt-1" />
          </div>
          <div>
            <Label>Admin Email</Label>
            <Input value={settings.adminEmail} onChange={e => setSettings(p => ({ ...p, adminEmail: e.target.value }))} className="mt-1" />
          </div>
          <div>
            <Label>Placement Year</Label>
            <Input value={settings.placementYear} onChange={e => setSettings(p => ({ ...p, placementYear: e.target.value }))} className="mt-1" />
          </div>
        </div>

        <div className="stat-card space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <div className="flex items-center justify-between">
            <Label>Notify on new applications</Label>
            <Switch checked={settings.notifyOnApplication} onCheckedChange={v => setSettings(p => ({ ...p, notifyOnApplication: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Notify on result uploads</Label>
            <Switch checked={settings.notifyOnResult} onCheckedChange={v => setSettings(p => ({ ...p, notifyOnResult: v }))} />
          </div>
        </div>

        <div className="stat-card space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Integrations</h3>
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-sync to Google Sheets</Label>
              <p className="text-xs text-muted-foreground">Automatically sync data to linked Google Sheets</p>
            </div>
            <Switch checked={settings.autoSyncSheets} onCheckedChange={v => setSettings(p => ({ ...p, autoSyncSheets: v }))} />
          </div>
        </div>

        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
}
