import { useEffect, useState } from "react";

import { getRefunds } from "../../services/refund";

import { refundCategories } from "../../constants/refundCategories";

import type { Refund, RefundMeta } from "../../types/refund";

import { Container } from "../../components/layout";
import { Button, Icon, Input, Text } from "../../components/ui";
import RefundItem from "./components/RefundItem";

import { CaretLeft, CaretRight, MagnifyingGlass } from "../../assets/icons";

export default function Refunds() {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<RefundMeta | null>(null);

  // Chama a função getRefunds() para buscar as solicitações de reembolso ao montar o componente e sempre que o valor de debouncedSearch mudar
  useEffect(() => {
    async function loadRefunds() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getRefunds(debouncedSearch || undefined, page);

        setRefunds(response.data);
        setMeta(response.meta);
      } catch {
        setError("Não foi possível carregar as solicitações.");
      } finally {
        setIsLoading(false);
      }
    }

    loadRefunds();
  }, [debouncedSearch, page]);

  // Debounce para evitar chamadas excessivas à API enquanto o usuário digita na barra de pesquisa
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1)
      setDebouncedSearch(search.trim());
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  if (error) {
    return (
      <Container className="max-w-6xl">
        <Text
          size="lg"
          weight="semiBold"
          className="text-center text-feedback-danger"
        >
          {error}
        </Text>
      </Container>
    );
  }

  function handleSearch() {
    setPage(1)
    setDebouncedSearch(search.trim());
  }

  function handlePreviousPage() {
    setPage((currentPage) => currentPage - 1);
  }

  function handleNextPage() {
    setPage((currentPage) => currentPage + 1);
  }

  return (
    <Container className="max-w-6xl gap-6">
      {/* Header */}
      <header className="flex flex-col gap-6">
        <Text as={"h1"} size="lg" weight="bold">
          Solicitações
        </Text>

        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              placeholder="Pesquisar pelo nome"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <Button size="sm" onClick={handleSearch}>
            <Icon svg={MagnifyingGlass} size="lg" fillColor="white" />
          </Button>
        </div>
      </header>

      <hr className="border-gray-400" />

      {/* Refund List */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <Text textColor="secondary" className="py-10 text-center">
            Carregando solicitações...
          </Text>
        ) : refunds.length === 0 ? (
          <Text
            weight="semiBold"
            textColor="secondary"
            className="py-10 text-center"
          >
            {debouncedSearch
              ? "Nenhuma solicitação encontrada para essa busca."
              : "Ainda não há solicitações de reembolso cadastradas."}
          </Text>
        ) : (
          refunds.map((refund) => {
            const category = refundCategories[refund.category];

            return (
              <RefundItem
                key={refund.id}
                id={refund.id}
                title={refund.title}
                category={category.label}
                categoryIcon={category.icon}
                value={refund.value}
              />
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2.5">
        <Button
          size="xs"
          onClick={handlePreviousPage}
          disabled={isLoading || !meta || meta.currentPage <= meta.firstPage}
        >
          <Icon svg={CaretLeft} size="lg" fillColor="white" />
        </Button>

        <Text as={"span"} textColor="secondary">
          {meta ? `${meta.currentPage}/${meta.lastPage}` : 1/1}
        </Text>

        <Button
          size="xs"
          onClick={handleNextPage}
          disabled={isLoading || !meta || meta.currentPage >= meta.lastPage}
        >
          <Icon svg={CaretRight} size="lg" fillColor="white" />
        </Button>
      </div>
    </Container>
  );
}
