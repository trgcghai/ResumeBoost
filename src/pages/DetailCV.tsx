import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsTab from "@/components/SkillsTab";
import AnalysisTab from "@/components/AnalysisTab";
import SuggestionsTab from "@/components/SuggestionsTab";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";

// Define the component as a functional component with TypeScript
const DetailCV: React.FC = () => {
  return (
    <div className="">
      <CustomBreadcrumb />

      {/* Main Title */}
      <h1 className="text-2xl font-bold mb-6">ĐÁNH GIÁ CHI TIẾT CV</h1>

      <div className="flex items-stretch gap-6">
        {/* Left Section: CV Uploaded */}
        <div className="w-1/2 border rounded-lg p-4 flex flex-col gap-4">
          {/* CV Upload Section */}
          <h2 className="text-lg font-semibold">CV của bạn</h2>
          <div className="bg-bgNormal rounded-lg flex-1 p-2">Your cv</div>
        </div>

        {/* Right Section: Overall Evaluation */}
        <div className="bg-white rounded-lg p-6 w-1/2 border">
          <h2 className="text-lg font-semibold mb-4">Đánh giá tổng quan</h2>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-main flex items-center justify-center">
                <span className="text-2xl font-bold">100</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 grid grid-cols-2 gap-6">
            <div className="">
              <div className="flex justify-between">
                <span>Mức độ phù hợp</span>
                <span>40</span>
              </div>
              <div className="w-full bg-bgNormal rounded-full h-2.5">
                <div
                  className="bg-main h-2.5 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Từ khóa phù hợp</span>
                <span>50</span>
              </div>
              <div className="w-full bg-bgNormal rounded-full h-2.5">
                <div
                  className="bg-main h-2.5 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Định dạng</span>
                <span>60</span>
              </div>
              <div className="w-full bg-bgNormal rounded-full h-2.5">
                <div
                  className="bg-main h-2.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Độ liên quan</span>
                <span>45</span>
              </div>
              <div className="w-full bg-bgNormal rounded-full h-2.5">
                <div
                  className="bg-main h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* CV Details Section */}
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
                <SkillsTab />
              </TabsContent>

              <TabsContent
                value="analysis"
                className="mt-4 border p-4 rounded-lg"
              >
                <AnalysisTab />
              </TabsContent>

              <TabsContent
                value="suggestions"
                className="mt-4 border p-4 rounded-lg"
              >
                <SuggestionsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCV;
