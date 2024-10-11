import { useState } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface PromoCodeInputProps {
  onApply: (discount: number) => void
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ onApply }) => {
  const [promoCode, setPromoCode] = useState('')
  const { databases } = useAppwrite()
  const { toast } = useToast()

  const applyPromoCode = async () => {
    try {
      const response = await databases.listDocuments('promo_codes', [
        databases.equal('code', promoCode)
      ])

      if (response.documents.length > 0) {
        const validPromo = response.documents[0]
        onApply(validPromo.discount)
        toast({
          title: 'Promo Code Applied',
          description: `You've received a ${validPromo.discount}% discount!`,
        })
      } else {
        toast({
          title: 'Invalid Promo Code',
          description: 'The entered promo code is not valid.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error applying promo code:', error)
      toast({
        title: 'Error',
        description: 'An error occurred while applying the promo code.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex space-x-2">
      <Input
        type="text"
        placeholder="Enter promo code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <Button onClick={applyPromoCode}>Apply</Button>
    </div>
  )
}

export default PromoCodeInput