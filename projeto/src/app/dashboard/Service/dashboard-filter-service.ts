import { Injectable } from '@angular/core';
import { FilterCat } from '../../calendario/Models/type';

@Injectable({
  providedIn: 'root'
})
export class DashboardFilterService {

    public filtros: FilterCat[] | null = null;

      // 🔥 NOVO: estrutura já organizada por tipo
    public filtrosPorTipo: Record<string, FilterCat[]> = {};


      // 🔥 NOVO: configuração dos tipos 
    tipos = [
      { key: 'select', label: 'Filtros Select' },
      { key: 'img', label: 'Filtros Imagens' },
      { key: 'multiselect', label: 'Filtros Multi Select' },
      { key: 'chk', label: 'Filtros Checkout' },
      { key: 'buttonset', label: 'Filtros Button set' },
      { key: 'btn', label: 'Filtros Button' }
    ];

    // 🔥 FUNÇÃO RECURSIVA (mantida)
  private flattenFiltros(filtros: FilterCat[]): FilterCat[] {
    return filtros.reduce((acc, f) => {
      acc.push(f);

      if (f.children?.length) {
        acc.push(...this.flattenFiltros(f.children));
      }

      return acc;
    }, [] as FilterCat[]);
  }

  // 🔥 SUA FUNÇÃO (mantida, só ajustada)
  public filtrosTipo(tipo: string): FilterCat[] {
    return (this.filtros ?? [])
      .map(f => {
        const filhos = this.flattenFiltros(f.children ?? [])
          .filter(x => x.typectrl === tipo);

        if (!filhos.length) return null;

        return {
          ...f,
          children: filhos
        } as FilterCat;
      })
      .filter((f): f is FilterCat => f !== null);
  }

  // 🔥 NOVA: monta tudo uma vez só
  public montarFiltrosPorTipo() {

    const resultado: Record<string, FilterCat[]> = {};

    for (const tipo of this.tipos) {
      resultado[tipo.key] = this.filtrosTipo(tipo.key);
    }

    this.filtrosPorTipo = resultado;
  }

    public trackFiltro(index: number, item: FilterCat) {
    return item.id;
  }
}
