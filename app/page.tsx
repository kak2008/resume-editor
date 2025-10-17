import EditorPanel from "./components/EditorPanel";
import PreviewPanel from "./components/PreviewPanel";
import DownloadButton from "./components/DownloadButton";
import { ResumeProvider } from "./components/ResumeContext";

export default function Home() {
  return (
    <ResumeProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
        {/* Left Panel */}
        <div className="w-[42%] h-full overflow-y-auto bg-white border-r border-gray-300">
          <EditorPanel />
        </div>

        {/* Right Panel */}
        <div className="relative flex-1 h-full overflow-y-auto bg-white group">
          <PreviewPanel />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <DownloadButton />
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
}
