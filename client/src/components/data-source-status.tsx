import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface DataSource {
  source: string;
  status: string;
  description: string;
}

interface DataSourceResponse {
  status: DataSource[];
  activeSources: string[];
  currentlyUsing: string;
}

export default function DataSourceStatus() {
  const { data, isLoading } = useQuery({
    queryKey: ['/api/data-sources'],
    queryFn: async () => {
      const response = await fetch('/api/data-sources');
      if (!response.ok) throw new Error('Failed to fetch data sources');
      return response.json() as Promise<DataSourceResponse>;
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partial':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'requires api key':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'requires api key':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-gray-400 animate-pulse" />
            <span className="text-sm text-gray-500">Loading data sources...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Data Sources</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Using: {data.currentlyUsing}
          </Badge>
        </div>

        <div className="space-y-2">
          {data.status.map((source) => (
            <div key={source.source} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                {getStatusIcon(source.status)}
                <span className="font-medium text-gray-700">{source.source}</span>
              </div>
              <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(source.status)}`}>
                {source.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Currently using <span className="font-medium">{data.currentlyUsing}</span> for property data.
            {data.currentlyUsing === 'Mock Data (Demo)' && (
              <span className="block mt-1">
                APIs would be used for real data.
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}