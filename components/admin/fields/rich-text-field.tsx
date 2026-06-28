"use client";
import dynamic from "next/dynamic";
import { Image as ImageIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(async () => {
  const quillModule = await import("react-quill-new");
  try {
    const resizeModule = await import("quill-resize-image");
    quillModule.Quill.register("modules/resize", resizeModule.default ?? resizeModule, true);
  } catch {}
  return quillModule.default;
}, { ssr: false }) as any;

export function RichTextField({ name, label, value, required }: { name: string; label: string; value?: string; required?: boolean }) {
  const [content, setContent] = useState(value ?? "");
  const editorRef = useRef<any>(null);
  const modules = useMemo(() => ({ toolbar: [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link", "image"], [{ align: [] }], ["clean"]], resize: { locale: {} } }), []);

  function resizeSelectedImage() {
    const width = window.prompt("Image width, for example 320px or 60%", "60%");
    if (!width) return;
    const editor = editorRef.current?.getEditor?.();
    const selection = editor?.getSelection?.();
    const root = editor?.root as HTMLElement | undefined;
    if (!root) return;
    const selected = root.querySelector(".ql-editor img.ql-selected") as HTMLImageElement | null;
    const images = Array.from(root.querySelectorAll(".ql-editor img")) as HTMLImageElement[];
    const target = selected ?? (selection ? images.find((img) => Math.abs((editor.getIndex?.(editor.scroll.find(img)) ?? -999) - selection.index) <= 1) : images.at(-1));
    if (target) {
      target.style.width = width;
      target.style.height = "auto";
      setContent(root.querySelector(".ql-editor")?.innerHTML ?? content);
    }
  }

  return (
    <div className="text-sm font-bold text-navy-900 md:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <button type="button" onClick={resizeSelectedImage} className="inline-flex items-center gap-2 rounded-brand border border-graphite-100 px-3 py-2 text-xs font-bold text-navy-900 hover:border-orange-500 hover:text-orange-600"><ImageIcon size={15} />Resize selected image</button>
      </div>
      <input name={name} value={content} required={required} readOnly className="sr-only" />
      <div className="mt-2 rounded-brand border border-graphite-100 bg-white [&_.ql-container]:min-h-64 [&_.ql-container]:rounded-b-brand [&_.ql-toolbar]:rounded-t-brand">
        <ReactQuill ref={editorRef} theme="snow" value={content} onChange={setContent} modules={modules} />
      </div>
      <p className="mt-2 text-xs font-normal text-graphite-500">Tip: click an image in the editor, drag resize handles when available, or use Resize selected image.</p>
    </div>
  );
}

