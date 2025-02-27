
import React, { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { UploadSection } from "@/components/dashboard/upload-section";
import { FileList } from "@/components/dashboard/file-list";
import { getFiles, UploadedFile } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon, ActivityIcon } from "lucide-react";

const Dashboard = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFiles = async () => {
    setIsLoading(true);
    try {
      const data = await getFiles();
      setFiles(data);
    } catch (error) {
      console.error("Error loading files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleUploadComplete = () => {
    loadFiles();
  };

  return (
    <MainLayout requireAuth>
      <div className="container max-w-screen-lg py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-muted-foreground">
              Upload files and generate reports
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <UploadSection onUploadComplete={handleUploadComplete} />

          <Tabs defaultValue="files" className="w-full animate-fade-in">
            <TabsList className="w-full mb-6 grid grid-cols-2 max-w-[400px]">
              <TabsTrigger value="files" className="flex items-center">
                <FileIcon className="h-4 w-4 mr-2" />
                Your Files
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center">
                <ActivityIcon className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="animate-fade-in">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border rounded-lg p-4 animate-pulse">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded h-10 w-10"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-1/4"></div>
                        </div>
                        <div className="h-8 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <FileList files={files} />
              )}
            </TabsContent>

            <TabsContent value="activity" className="animate-fade-in">
              <div className="text-center py-12 border border-dashed rounded-lg">
                <p className="text-muted-foreground">Activity log coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
