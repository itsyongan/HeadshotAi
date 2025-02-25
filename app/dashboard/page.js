import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import ButtonCheckout from "@/components/ButtonCheckout";
import ButtonPortal from "@/components/ButtonPortal";
import ImageUploader from "@/components/ImageUploader";

async function getUser() {
	const session = await auth();

	await connectMongo();

	return await User.findById(session.user.id);
}

export default async function Dashboard() {
	const user = await getUser();

	return (
		<main className="bg-base-200 min-h-screen">
			{/* HEADER */}
			<section className="bg-base-100">
				<div className="max-w-5xl mx-auto px-5 py-3 flex justify-between">
					{user.hasAccess ? <ButtonPortal /> : <ButtonCheckout />}
					<ButtonLogout />
				</div>
			</section>

			<section className="max-w-5xl mx-auto px-5 py-12 space-y-12">
				<ImageUploader />
			</section>
		</main>
	);
}
