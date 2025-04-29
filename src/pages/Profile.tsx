import React, { useMemo, useState } from "react";
import Overview from "../components/OverView";
import Card from "../components/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomBreadcrumb from "@/components/layout/CustomBreadcrumb";
import { useUserResumes } from "@/hooks/useUserResumes";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { CardData } from "@/type";
import { filterResumesByScore, sortResumes } from "@/utils/ResumeUtil";

const Profile: React.FC = () => {
  const [scoreFilter, setScoreFilter] = useState("all");
  const [orderFilter, setOrderFilter] = useState("uploadDesc");
  const { data, loading, error } = useUserResumes();

  const processedResumes: CardData[] = useMemo(() => {
    if (!data || data.length === 0) return [];

    // First filter, then sort (to avoid sorting unnecessary items)
    return sortResumes(
      [...filterResumesByScore(data, scoreFilter)],
      orderFilter
    );
  }, [data, scoreFilter, orderFilter]);

  return (
    <>
      <CustomBreadcrumb />
      <div className="p-6 bg-white shadow rounded-lg">
        {/* Overview Section */}
        <Overview />

        {/* CV List Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Danh sách CV của bạn</h2>

            {/* Filter Bar */}
            <div className="flex gap-4 items-center">
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Lọc theo điểm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="high">Điểm cao (90+)</SelectItem>
                  <SelectItem value="average">
                    Điểm trung bình (70-90)
                  </SelectItem>
                  <SelectItem value="low">Điểm thấp (&lt;70)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={orderFilter} onValueChange={setOrderFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uploadDesc">
                    Ngày tải lên giảm dần
                  </SelectItem>
                  <SelectItem value="uploadAsc">
                    Ngày tải lên tăng dần
                  </SelectItem>
                  <SelectItem value="scoreDesc">Điểm giảm dần</SelectItem>
                  <SelectItem value="scoreAsc">Điểm tăng dần</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>
                Không thể tải dữ liệu CV. Vui lòng thử lại sau.
              </AlertDescription>
            </Alert>
          )}

          {/* CV Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading &&
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="border rounded-lg p-4"
                  >
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-20 w-full rounded-md" />
                  </div>
                ))}{" "}
            {processedResumes.length > 0
              ? processedResumes.map((resume) => (
                  <Card
                    key={resume.resumeId}
                    id={resume.analysisId}
                    title={resume.title}
                    uploadTime={resume.uploadTime}
                    score={resume.avgScore}
                  />
                ))
              : !error && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">Không có resume nào !!</p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
