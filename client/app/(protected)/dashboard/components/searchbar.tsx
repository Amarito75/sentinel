"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAssetBySymbol, getCoinList } from "@/services/crypto-api";

interface CryptoCoin {
  id: number;
  symbol: string;
  partner_symbol: string;
  data_available_from: number;
}

interface CryptoData {
  [key: string]: CryptoCoin;
}

const Searchbar = () => {
  const [open, setOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState<CryptoData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinList = await getCoinList();
        console.log("Coin list:", coinList);
        setCryptoData(coinList.Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getLogoUrl = (symbol: string) => {
    return `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/color/${symbol.toLowerCase()}.png`;
  };

  const CryptoIcon = ({ symbol }: { symbol: string }) => {
    const [imageError, setImageError] = useState(false);

    if (imageError) {
      return (
        <div className="w-6 h-6 bg-card rounded-full flex items-center justify-center mr-2">
          <span className="text-xs font-bold">
            {symbol.slice(0, 2).toUpperCase()}
          </span>
        </div>
      );
    }

    return (
      <Image
        src={getLogoUrl(symbol)}
        alt={`${symbol} logo`}
        width={24}
        height={24}
        className="mr-2"
        onError={() => setImageError(true)}
        unoptimized
      />
    );
  };

  return (
    <div className="">
      <Button size="icon" onClick={() => setOpen(true)}>
        <SearchIcon className="w-4 h-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for a cryptocurrency..." />
        <CommandList>
          <CommandGroup heading="Cryptocurrencies">
            {Object.keys(cryptoData).length > 0 ? (
              Object.entries(cryptoData).map(([symbol, coin]) => (
                <Link
                  href={`/dashboard/crypto/${symbol.toLowerCase()}`}
                  key={coin.id}
                >
                  <CommandItem className="flex items-center">
                    <CryptoIcon symbol={symbol} />
                    {symbol}
                  </CommandItem>
                </Link>
              ))
            ) : (
              <CommandItem>No cryptocurrencies found.</CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default Searchbar;
