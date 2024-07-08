export const parseJSON = (data: string, subject?: string) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    const error = e as Error;

    throw new Error(
      subject
        ? `failed to parse json string while parsing ${subject}: ${error.message}`
        : `failed to parse json string: ${error.message}`,
    );
  }
};
