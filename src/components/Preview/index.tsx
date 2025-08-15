import {
  useEffect, useState, useCallback, useRef, useLayoutEffect,
} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDispatch } from 'react-redux';
import { generatePdfForCurrentUser } from '../../services/useGeneratePDF';
import { AppDispatch } from 'store';
import './index.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

interface Props {
  questionKey: string;
  size?: number;
}

const PAGE_RATIO = 1.5;           // 1603 / 1068

export const Preview: React.FC<Props> = ({ questionKey, size = 400 }) => {
  const dispatch = useDispatch<AppDispatch>();

  /* ---------- state ------------------------------------------------ */
  const [fileUrl,  setFileUrl]     = useState<string>();
  const [numPages, setNumPages]    = useState<number>();
  const [firstPage, setFirst]      = useState<number>(1);
  const [rendered,  setRendered]   = useState<number>(0); // сколько <Page> готово

  const scrollRef = useRef<HTMLDivElement>(null);

  /* ---------- fetch PDF + pagesMap -------------------------------- */
  useEffect(() => {
    let died = false;
    (async () => {
      const res = await dispatch<any>(generatePdfForCurrentUser());
      if (died || !res?.blob) return;

      const { blob, pagesMap } =
        res as { blob: Blob; pagesMap: Record<string, number> };

      setRendered(0);                        // сброс счётчика
      setFileUrl(URL.createObjectURL(blob)); // триггерит перерисовку
      setFirst(pagesMap?.[questionKey] ?? 1);
    })();

    return () => { died = true; fileUrl && URL.revokeObjectURL(fileUrl); };
  }, [questionKey, dispatch]);               // генерим при смене вопроса

  /* ---------- размеры ------------------------------------------------ */
  const GAP   = 12;      // тот же, что в .sq-scroll
const SCALE = 0.8;     // ← во сколько раз сжимаем страницу

const inner = size - GAP * 2;      // внутренняя ширина wrapper’а
const pageWidth  = inner * SCALE;  // стало меньше
const pageHeight = pageWidth * PAGE_RATIO;

  /* ---------- скролл после полной отрисовки ------------------------ */
  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    if (!numPages)           return;         // ещё не знаем, сколько страниц
    if (rendered < numPages) return;         // не все страницы готовы

    scrollRef.current.scrollTo({
      top: (firstPage - 1) * (pageHeight + 12),
      behavior: 'auto',
    });
  }, [rendered, numPages, firstPage, pageHeight]);

  /* ---------- callbacks -------------------------------------------- */
  const onLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => setNumPages(numPages),
    [],
  );

  const onPageRender = useCallback(
    () => setRendered((n) => n + 1),
    [],
  );

  /* ---------- render ------------------------------------------------ */
  return (
    <div className="sq-wrapper" >
      {!fileUrl ? (
       <div className="sq-loader" aria-label="Загрузка PDF" />
      ) : (
        <div className="sq-scroll" ref={scrollRef}>
          <Document
            file={fileUrl}
            loading="Loading.."
            onLoadSuccess={onLoadSuccess}
          >
            {Array.from({ length: numPages ?? 0 }, (_, i) => (
              <Page
                key={i}
                pageNumber={i + 1}
                width={pageWidth}
                onRenderSuccess={onPageRender}   // ← счётчик готовых страниц
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};
