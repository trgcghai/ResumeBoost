import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsTab from "@/components/detailAnalysis/SkillsTab";
import AnalysisTab from "@/components/detailAnalysis/AnalysisTab";
import SuggestionsTab from "@/components/detailAnalysis/SuggestionsTab";
import CustomBreadcrumb from "@/components/layout/CustomBreadcrumb";
import PDFDisplay from "@/components/PDFDisplay";
import { useAnalysisData } from "@/hooks/useAnalyzeResult";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import OverallAnalysis from "@/components/detailAnalysis/OverallAnalysis";
import LoadingSkeleton from "@/components/detailAnalysis/LoadingSkeleton";

const DetailCV: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { analysisData, loading, error } = useAnalysisData(id);

  return (
    <div className="">
      <CustomBreadcrumb currentIsId={true} />

      <h1 className="text-2xl font-bold mb-6">ĐÁNH GIÁ CHI TIẾT CV</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Không thể tải dữ liệu phân tích. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-stretch gap-6">
        <div className="w-1/2 border rounded-lg p-4 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">CV của bạn</h2>
          <div className="bg-bgNormal rounded-lg flex-1 p-2">
            <PDFDisplay file="/dethi-dapan_tientien_2425-HK1.pdf" />
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="bg-white rounded-lg p-6 w-1/2 border">
            <OverallAnalysis analysisData={analysisData} />

            <div>
              <h2 className="text-lg font-semibold mb-4">Đánh giá chi tiết</h2>

              <Tabs defaultValue="skills" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="skills"
                    className="data-[state=active]:bg-main data-[state=active]:text-white"
                  >
                    Kỹ năng
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    className="data-[state=active]:bg-main data-[state=active]:text-white"
                  >
                    Phân tích
                  </TabsTrigger>
                  <TabsTrigger
                    value="suggestions"
                    className="data-[state=active]:bg-main data-[state=active]:text-white"
                  >
                    Gợi ý
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="skills"
                  className="mt-4 border p-4 rounded-lg"
                >
                  {analysisData?.skills ? (
                    <SkillsTab skills={analysisData.skills} />
                  ) : (
                    <div>Không có dữ liệu kỹ năng.</div>
                  )}
                </TabsContent>

                <TabsContent
                  value="analysis"
                  className="mt-4 border p-4 rounded-lg"
                >
                  {analysisData?.analysis ? (
                    <AnalysisTab analysis={analysisData.analysis} />
                  ) : (
                    <div>Không có dữ liệu phân tích.</div>
                  )}
                </TabsContent>

                <TabsContent
                  value="suggestions"
                  className="mt-4 border p-4 rounded-lg"
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
