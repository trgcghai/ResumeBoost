import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsTab from "@/components/detailAnalysis/SkillsTab";
import AnalysisTab from "@/components/detailAnalysis/AnalysisTab";
import SuggestionsTab from "@/components/detailAnalysis/SuggestionsTab";
import CustomBreadcrumb from "@/components/layout/CustomBreadcrumb";
import PDFDisplay from "@/components/pdf/PDFDisplay";
import { useAnalysisData } from "@/hooks/fetch/useAnalyzeResult";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import OverallAnalysis from "@/components/detailAnalysis/OverallAnalysis";
import useFetchAdminData from "@/hooks/fetch/useFetchAdminData";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`bg-white rounded-lg p-4 sm:p-6 border ${className}`}>
      {/* Overall score skeleton */}
      <div className="mb-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-16 sm:h-24 w-full sm:w-1/3 rounded-lg" />
          <Skeleton className="h-16 sm:h-24 w-full sm:w-2/3 rounded-lg" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div>
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-40 sm:h-64 w-full rounded-lg" />
      </div>
    </div>
  );
};

const DetailCV: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { analysisData, loading, error } = useAnalysisData(id);
  const { useResumeById } = useFetchAdminData();
  const { resume } = useResumeById(analysisData?.resumeId || "");
  const [showPdf, setShowPdf] = useState(true);

  return (
    <div className="">
      <CustomBreadcrumb currentIsId={true} />

      <h1 className="text-2xl font-bold mb-6">ĐÁNH GIÁ CHI TIẾT CV</h1>

      {error && (
        <Alert variant="destructive" className="mb-4 sm:mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Không thể tải dữ liệu phân tích. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      )}

      {/* Mobile PDF toggle button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setShowPdf(!showPdf)}
          className="w-full flex items-center justify-between"
        >
          <span>{showPdf ? "Ẩn CV" : "Hiển thị CV"}</span>
          {showPdf ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {/* Main content - flex-col on mobile, flex-row on desktop */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-6">
        {/* PDF display section - full width on mobile, 1/2 on desktop */}
        <div
          className={`w-full lg:w-1/2 border rounded-lg p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 ${
            !showPdf && "hidden lg:flex"
          }`}
        >
          <h2 className="text-base sm:text-lg font-semibold">CV của bạn</h2>
          <div className="bg-bgNormal rounded-lg flex-1 p-1 sm:p-2 min-h-[60vh] lg:min-h-[80vh]">
            <PDFDisplay
              file={
                resume?.fileUrl.secureUrl || resume?.fileUrl.publicUrl || ""
              }
            />
          </div>
        </div>

        {/* Analysis section - full width on mobile, 1/2 on desktop */}
        {loading ? (
          <LoadingSkeleton className="w-full lg:w-1/2" />
        ) : (
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full lg:w-1/2 border">
            <OverallAnalysis analysisData={analysisData} />

            <div className="mt-6">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Đánh giá chi tiết
              </h2>

              <Tabs defaultValue="skills" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="skills"
                    className="text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-main data-[state=active]:text-white"
                  >
                    Kỹ năng
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    className="text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-main data-[state=active]:text-white"
                  >
                    Phân tích
                  </TabsTrigger>
                  <TabsTrigger
                    value="suggestions"
                    className="text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-main data-[state=active]:text-white"
                  >
                    Gợi ý
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="skills"
                  className="mt-3 sm:mt-4 border p-3 sm:p-4 rounded-lg"
                >
                  {analysisData?.skills ? (
                    <SkillsTab skills={analysisData.skills} />
                  ) : (
                    <div>Không có dữ liệu kỹ năng.</div>
                  )}
                </TabsContent>

                <TabsContent
                  value="analysis"
                  className="mt-3 sm:mt-4 border p-3 sm:p-4 rounded-lg"
                >
                  {analysisData?.analysis ? (
                    <AnalysisTab analysis={analysisData.analysis} />
                  ) : (
                    <div>Không có dữ liệu phân tích.</div>
                  )}
                </TabsContent>

                <TabsContent
                  value="suggestions"
                  className="mt-3 sm:mt-4 border p-3 sm:p-4 rounded-lg"
                >
                  {analysisData?.suggestions ? (
                    <SuggestionsTab suggestions={analysisData?.suggestions} />
                  ) : (
                    <div>Không có dữ liệu gợi ý.</div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCV;
