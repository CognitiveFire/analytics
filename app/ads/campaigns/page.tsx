import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { fetchCampaigns } from "@/lib/google-ads/services";

export default async function AdsCampaignsPage() {
  const campaigns = await fetchCampaigns("demo-executive");

  return (
    <Card className="border-zinc-200/90 bg-[#f2f0ea]">
      <CardTitle>Campaign Diagnostic Layer</CardTitle>
      <CardDescription className="mt-2">Operational campaign diagnostics across spend efficiency and structure quality.</CardDescription>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            <tr>
              <th className="pb-3">Campaign</th>
              <th className="pb-3">Spend 30d</th>
              <th className="pb-3">ROAS 30d</th>
              <th className="pb-3">Conversions 30d</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr className="border-t border-zinc-200/80" key={campaign.id}>
                <td className="py-3 font-medium">{campaign.name}</td>
                <td className="py-3">kr {campaign.spend30d.toLocaleString("en-GB")}</td>
                <td className="py-3">{campaign.roas30d.toFixed(1)}x</td>
                <td className="py-3">{campaign.conversions30d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
