'use client'

import { useLeason } from '@/hooks/useLeason'
import { Link } from '@phosphor-icons/react'

export function LeasonInformation() {
  const { leason } = useLeason()

  return (
    <>
      {leason && (
        <div className="max-w-[1120px] m-auto flex flex-col py-8 px-8 md:px-0 w-full">
          <h1 className="text-5xl font-bold">{leason?.title}</h1>

          <h5 className="text-lg font-bold mt-12">Descrição</h5>

          <p className="text-base mt-4 text-primary-20">
            {leason?.description}
          </p>

          <h5 className="text-lg font-bold mt-9">Materiais complementares</h5>

          <div className="flex flex-col w-full gap-4 mt-4">
            {leason?.complementary_materials?.map((complementaryMaterial) => {
              return (
                <a
                  key={complementaryMaterial.name}
                  href={complementaryMaterial.url}
                  className="flex items-center gap-2 text-primary-40 transition-all hover:text-white"
                >
                  {complementaryMaterial.name}
                  <Link />
                </a>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
