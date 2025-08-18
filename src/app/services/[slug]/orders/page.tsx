import { notFound } from "next/navigation"
import { getServiceBySlug } from "../../../../lib/services-data"
import ServiceOrderClient from "./service-order-client"

interface ServiceOrderPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ServiceOrderPage({ params }: ServiceOrderPageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <ServiceOrderClient slug={slug} service={service} />
    </>
  )
}