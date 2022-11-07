import { ReactElement, useMemo } from "react";
import { pagerStyles } from "./style";
import { PagerProps } from "./types";

const displayLimit = 3;

export function Pager({
  span,
  count,
  offset,
  limit,
  onPageChange,
}: PagerProps): ReactElement | null {
  const [currentPage, maxPage, renderPre, renderPost] = useMemo(() => {
    const currentPage = Math.floor(offset / limit);
    const maxPage = Math.ceil(count / limit);

    const pre = Array.from(
      { length: currentPage },
      (v, k) => currentPage - (k + 1)
    ).reverse();
    const post = Array.from(
      { length: maxPage - 1 - currentPage },
      (_v, k) => currentPage + (k + 1)
    );
    return [currentPage, maxPage, pre, post];
  }, [offset, count, limit]);

  return maxPage > 1 ? (
    <tfoot>
      <tr>
        <td colSpan={span}>
          <div css={pagerStyles.tfoot}>
            {currentPage > 0 && (
              <a href="#" onClick={() => onPageChange(offset - limit)}>
                {"< Previous"}
              </a>
            )}

            {renderPre.length > displayLimit && "..."}

            {renderPre.map(
              (i) =>
                i >= currentPage - displayLimit && (
                  <a key={i} href="#" onClick={() => onPageChange(i * limit)}>
                    {i + 1}
                  </a>
                )
            )}

            {currentPage + 1}

            {renderPost.map(
              (i) =>
                i <= currentPage + displayLimit && (
                  <a key={i} href="#" onClick={() => onPageChange(i * limit)}>
                    {i + 1}
                  </a>
                )
            )}

            {renderPost.length > displayLimit && "..."}

            {currentPage < maxPage - 1 && (
              <a href="#" onClick={() => onPageChange(offset + limit)}>
                {"Next >"}
              </a>
            )}
          </div>
        </td>
      </tr>
    </tfoot>
  ) : null;
}
