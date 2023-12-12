export type User = {
	data?: {
		id: number;
		email: string;
		role: string;
		coach_id: string;
        coach_name: string;
	};
	token: string;
};

export type ParticipantCardPrecenseInformation = {
	presence: boolean;
	cancellationReason?: string;
} | null;

export type TagStatus = 'coming' | 'canceled' | 'done' | 'completed';


