import { MatPaginatorIntl } from '@angular/material/paginator';

/**
 * Overrides range label method with  hungarian translations
 * @param page
 * @param pageSize
 * @param length
 */
const hunRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 a ${length} ból`;
  }

  length = Math.max(length, 0);
  const startIndex = page * pageSize;

  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} elem a ${length} ból`;
};

export function getHungarianPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Oldalanként megjelenített elemek:';
  paginatorIntl.nextPageLabel = 'Kövezkező oldal';
  paginatorIntl.previousPageLabel = 'Előző oldal';
  paginatorIntl.firstPageLabel = 'Első oldal';
  paginatorIntl.lastPageLabel = 'Utolsó oldal';
  paginatorIntl.getRangeLabel = hunRangeLabel;

  return paginatorIntl;
}
