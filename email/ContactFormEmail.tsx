import React from 'react'
import {
    Html,
    Body,
    Head,
    Heading,
    Hr,
    Container,
    Preview,
    Section,
    Text
} from '@react-email/components'

import { Tailwind } from '@react-email/tailwind';

interface ContactFormEmailProps {
    message: string;
    senderEmail: string;
}

export default function ContactFormEmail({message, senderEmail}: ContactFormEmailProps) {
  return (
    <html>
        <Head/>
        <Preview>New message from Trabzon Rehberim form</Preview>
        <Tailwind>
            <Body className='bg-neutral-100'>
                <Container>
                    <Section className='bg-white border-border border my-10 px-10 py-4 rounded-lg'>
                        <Heading className='leading-tight'>You received a new message from Trabzon Rehberim</Heading>
                        <Text>{message}</Text>
                        <Hr/>
                        <Text>The sender&apos;s email is: {senderEmail}</Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </html>
  )
}
